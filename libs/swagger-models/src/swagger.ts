import { ApiAuthGetUserDetailResponseDto } from 'apps/auth/src/auth/dto/api-auth-get-user-detail-response.dto';
import { ApiAuthGetUsersResponseDto } from 'apps/auth/src/auth/dto/api-auth-get-users-response.dto';
import { ApiAuthPatchUserRoleResponseDto } from 'apps/auth/src/auth/dto/api-auth-patch-user-role-response.dto';
import { ApiAuthPostLoginResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-login-response.dto';
import { ApiAuthPostLogoutResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-logout-response.dto';
import { ApiAuthPostRefreshResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-refresh-response.dto';
import { ApiAuthPostSignupResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-signup-response.dto';
import { ApiEventPostResponseDto } from 'apps/event/src/event/dto/api-event-post-response.dto';
import { ApiEventPostRewardResponseDto } from 'apps/event/src/event/dto/api-event-post-reward-response.dto';

export const SwaggerModels = [
  ApiAuthGetUserDetailResponseDto,
  ApiAuthGetUsersResponseDto,
  ApiAuthPatchUserRoleResponseDto,
  ApiAuthPostLoginResponseDto,
  ApiAuthPostLogoutResponseDto,
  ApiAuthPostRefreshResponseDto,
  ApiAuthPostSignupResponseDto,
  ApiEventPostResponseDto,
  ApiEventPostRewardResponseDto,
];
