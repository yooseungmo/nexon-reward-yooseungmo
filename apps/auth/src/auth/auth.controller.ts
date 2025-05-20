import { JwtAuthGuard, RbacGuard } from '@app/common';
import { Public } from '@app/common/decorator/public.decorator';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthPostRefreshRequestDto } from 'apps/auth/src/auth/dto/api-auth-post-refresh-request.dto';
import { ApiAuthPostRefreshResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-refresh-response.dto';
import { AuthService } from './auth.service';
import { ApiAuthPostLoginRequestDto } from './dto/api-auth-post-login-request.dto';
import { ApiAuthPostLoginResponseDto } from './dto/api-auth-post-login-response.dto';
import { ApiAuthPostLogoutRequestDto } from './dto/api-auth-post-logout-request.dto';
import { ApiAuthPostLogoutResponseDto } from './dto/api-auth-post-logout-response.dto';
import { ApiAuthPostSignupRequestDto } from './dto/api-auth-post-signup-request.dto';
import { ApiAuthPostSignupResponseDto } from './dto/api-auth-post-signup-response.dto';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: '회원가입', description: 'Roles = [USER, OPERATOR, AUDITOR, ADMIN]' })
  @ApiBody({ type: ApiAuthPostSignupRequestDto })
  @ApiResponse({ status: 201, type: ApiAuthPostSignupResponseDto })
  async signup(@Body() dto: ApiAuthPostSignupRequestDto): Promise<ApiAuthPostSignupResponseDto> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: ApiAuthPostLoginRequestDto })
  @ApiResponse({ status: 200, type: ApiAuthPostLoginResponseDto })
  async login(@Body() dto: ApiAuthPostLoginRequestDto): Promise<ApiAuthPostLoginResponseDto> {
    return this.authService.login(dto);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: '로그인 연장' })
  @ApiBody({ type: ApiAuthPostRefreshRequestDto })
  @ApiResponse({ status: 200, type: ApiAuthPostRefreshResponseDto })
  async refresh(@Body() dto: ApiAuthPostRefreshRequestDto): Promise<ApiAuthPostRefreshResponseDto> {
    return this.authService.refresh(dto);
  }

  @Public()
  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  @ApiBody({ type: ApiAuthPostLogoutRequestDto })
  @ApiResponse({ status: 200, type: ApiAuthPostLogoutResponseDto })
  async logout(@Body() dto: ApiAuthPostLogoutRequestDto): Promise<ApiAuthPostLogoutResponseDto> {
    return this.authService.logout(dto);
  }
}
