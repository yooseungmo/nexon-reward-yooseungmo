import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'apps/gateway/src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { ApiAuthPostLoginRequestDto } from './dto/api-auth-post-login-request.dto';
import { ApiAuthPostLoginResponseDto } from './dto/api-auth-post-login-response.dto';
import { ApiAuthPostSignupRequestDto } from './dto/api-auth-post-signup-request.dto';
import { ApiAuthPostSignupResponseDto } from './dto/api-auth-post-signup-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
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
  }
}
