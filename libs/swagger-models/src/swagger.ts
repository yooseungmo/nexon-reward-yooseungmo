import { ApiAuthGetUserDetailResponseDto } from 'apps/auth/src/auth/dto/api-auth-get-user-detail-response.dto';
import { ApiAuthGetUsersResponseDto } from 'apps/auth/src/auth/dto/api-auth-get-users-response.dto';
import { ApiAuthPatchUserRoleResponseDto } from 'apps/auth/src/auth/dto/api-auth-patch-user-role-response.dto';
import { ApiAuthPostLoginResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-login-response.dto';
import { ApiAuthPostLogoutResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-logout-response.dto';
import { ApiAuthPostRefreshResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-refresh-response.dto';
import { ApiAuthPostSignupResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-signup-response.dto';
import { AuthUsersDto } from 'apps/auth/src/auth/dto/auth-users-dto';
import { ApiEventGetDetailResponseDto } from 'apps/event/src/event/dto/api-event-get-detail-response.dto';
import { ApiEventGetListResponseDto } from 'apps/event/src/event/dto/api-event-get-list-response.dto';
import { ApiEventPostReceiveResponseDto } from 'apps/event/src/event/dto/api-event-post-receive-response.dto';
import { ApiEventPostResponseDto } from 'apps/event/src/event/dto/api-event-post-response.dto';
import { ApiEventPostRewardResponseDto } from 'apps/event/src/event/dto/api-event-post-reward-response.dto';
import { EventListItemDto } from 'apps/event/src/event/dto/event-list-item.dto';
import { ApiReceiveGetListResponseDto } from 'apps/event/src/event/receive/dto/api-receive-get-list-response.dto';
import { ReceiveItemDto } from 'apps/event/src/event/receive/dto/receive-item.dto';

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
  AuthUsersDto,
  ApiEventGetDetailResponseDto,
  ApiEventGetListResponseDto,
  EventListItemDto,
  ApiReceiveGetListResponseDto,
  ReceiveItemDto,
  ApiEventPostReceiveResponseDto,
];
