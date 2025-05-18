import { isEmpty } from '@app/common/util/is-empty';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiAuthPostRefreshRequestDto } from 'apps/auth/src/auth/dto/api-auth-post-refresh-request.dto';
import { ApiAuthPostRefreshResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-refresh-response.dto';
import { UserDocument } from 'apps/auth/src/auth/schemas/user.schema';
import { UserMongoRepository } from 'apps/auth/src/auth/user.mongo.repository';
import { plainToInstance } from 'class-transformer';
import { ApiAuthPostLoginRequestDto } from './dto/api-auth-post-login-request.dto';
import { ApiAuthPostLoginResponseDto } from './dto/api-auth-post-login-response.dto';
import { ApiAuthPostLogoutRequestDto } from './dto/api-auth-post-logout-request.dto';
import { ApiAuthPostLogoutResponseDto } from './dto/api-auth-post-logout-response.dto';
import { ApiAuthPostSignupRequestDto } from './dto/api-auth-post-signup-request.dto';
import { ApiAuthPostSignupResponseDto } from './dto/api-auth-post-signup-response.dto';

@Injectable()
export class AuthService {
  private refreshSecret: string;
  private refreshExpire: string;

  constructor(
    private readonly repository: UserMongoRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.refreshSecret = this.getEnvOrThrow('REFRESH_TOKEN_SECRET');
    this.refreshExpire = this.getEnvOrThrow('REFRESH_TOKEN_EXPIRES_IN');
  }

  private getEnvOrThrow(key: string): string {
    const val = this.config.get<string>(key);
    if (isEmpty(val)) throw new InternalServerErrorException(`Missing ${key}`);
    return val;
  }

  async signup(dto: ApiAuthPostSignupRequestDto): Promise<ApiAuthPostSignupResponseDto> {
    try {
      const user: UserDocument = await this.repository.createUser(dto);

      return plainToInstance(ApiAuthPostSignupResponseDto, user, { excludeExtraneousValues: true });
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  async login(dto: ApiAuthPostLoginRequestDto): Promise<ApiAuthPostLoginResponseDto> {
    const user = await this.repository.findByEmail(dto.email);
    if (isEmpty(user)) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await import('bcrypt').then((bcrypt) =>
      bcrypt.compare(dto.password, user.password),
    );
    if (isEmpty(isMatch)) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, roles: user.roles };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.refreshSecret,
        expiresIn: this.refreshExpire,
      }),
    ]);

    await this.repository.setRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refresh(dto: ApiAuthPostRefreshRequestDto): Promise<ApiAuthPostRefreshResponseDto> {
    const user = await this.repository.findByRefreshToken(dto.refreshToken);
    if (isEmpty(user)) throw new UnauthorizedException('Invalid refresh token');
    try {
      const decoded = this.jwtService.verify(dto.refreshToken, {
        secret: this.refreshSecret,
      });

      const payload = {
        sub: decoded.sub,
        roles: decoded.roles,
      };

      const [accessToken, newRefreshToken] = await Promise.all([
        this.jwtService.signAsync(payload),
        this.jwtService.signAsync(payload, {
          secret: this.refreshSecret,
          expiresIn: this.refreshExpire,
        }),
      ]);

      await this.repository.setRefreshToken(user.id, newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }
  }

  async logout(dto: ApiAuthPostLogoutRequestDto): Promise<ApiAuthPostLogoutResponseDto> {
    const user = await this.repository.findByRefreshToken(dto.refreshToken);
    if (isEmpty(user)) throw new UnauthorizedException('Invalid refresh token');

    await this.repository.removeRefreshToken(user.id);

    return { success: true };
  }
}
