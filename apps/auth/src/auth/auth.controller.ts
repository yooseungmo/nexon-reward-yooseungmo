import { JwtAuthGuard, Rbac, RbacGuard, Role } from '@app/common';
import { Public } from '@app/common/decorator/public.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGetUserDetailResponseDto } from 'apps/auth/src/auth/dto/api-auth-get-user-detail-response.dto';
import { ApiAuthGetUsersQueryRequestDto } from 'apps/auth/src/auth/dto/api-auth-get-users-query-request.dto';
import { ApiAuthGetUsersResponseDto } from 'apps/auth/src/auth/dto/api-auth-get-users-response.dto';
import { ApiAuthPatchUserRoleRequestDto } from 'apps/auth/src/auth/dto/api-auth-patch-user-role-request.dto';
import { ApiAuthPatchUserRoleResponseDto } from 'apps/auth/src/auth/dto/api-auth-patch-user-role-response.dto';
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

  @Get('users')
  @Rbac(Role.OPERATOR)
  @ApiOperation({
    summary: '유저 목록 조회 [이름 필터 + 페이지네이션]',
    description: 'OPERATOR 권한 필요',
  })
  @ApiResponse({ status: 200, type: ApiAuthGetUsersResponseDto })
  async getAllUsers(
    @Query() query: ApiAuthGetUsersQueryRequestDto,
  ): Promise<ApiAuthGetUsersResponseDto> {
    return this.authService.getAllUsers(query);
  }

  @Get('users/:id')
  @Rbac(Role.OPERATOR)
  @ApiOperation({ summary: '유저 상세 조회', description: 'OPERATOR 권한 필요' })
  @ApiResponse({ status: 200, type: ApiAuthGetUserDetailResponseDto })
  async getUserDetail(@Param('id') id: string): Promise<ApiAuthGetUserDetailResponseDto> {
    return this.authService.getUserDetail(id);
  }

  @Patch('users/:id/role')
  @Rbac(Role.ADMIN)
  @ApiOperation({ summary: '유저 역할 변경', description: 'ADMIN 권한 필요' })
  @ApiBody({ type: ApiAuthPatchUserRoleRequestDto })
  @ApiResponse({ status: 200, type: ApiAuthPatchUserRoleResponseDto })
  async updateRole(
    @Param('id') id: string,
    @Body() dto: ApiAuthPatchUserRoleRequestDto,
  ): Promise<ApiAuthPatchUserRoleResponseDto> {
    return this.authService.updateRole(id, dto);
  }
}
