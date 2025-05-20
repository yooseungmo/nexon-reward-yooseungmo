import { ApiAuthPostLoginResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-login-response.dto';
import { ApiAuthPostLogoutResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-logout-response.dto';
import { ApiAuthPostRefreshResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-refresh-response.dto';
import { ApiAuthPostSignupResponseDto } from 'apps/auth/src/auth/dto/api-auth-post-signup-response.dto';
import { ApiUserGetDetailResponseDto } from 'apps/auth/src/auth/user/dto/api-user-get-detail-response.dto';
import { ApiUserGetResponseDto } from 'apps/auth/src/auth/user/dto/api-user-get-response.dto';
import { ApiUserPatchRoleResponseDto } from 'apps/auth/src/auth/user/dto/api-user-patch-role-response.dto';
import { UserItemsDto } from 'apps/auth/src/auth/user/dto/auth-users-dto';
import { ApiEventGetDetailResponseDto } from 'apps/event/src/event/dto/api-event-get-detail-response.dto';
import { ApiEventGetListResponseDto } from 'apps/event/src/event/dto/api-event-get-list-response.dto';
import { ApiEventPatchResponseDto } from 'apps/event/src/event/dto/api-event-patch-response.dto';
import { ApiEventPatchRewardResponseDto } from 'apps/event/src/event/dto/api-event-patch-reward-response.dto';
import { ApiEventPostReceiveResponseDto } from 'apps/event/src/event/dto/api-event-post-receive-response.dto';
import { ApiEventPostResponseDto } from 'apps/event/src/event/dto/api-event-post-response.dto';
import { ApiEventPostRewardResponseDto } from 'apps/event/src/event/dto/api-event-post-reward-response.dto';
import { ApiTestActivityLogResponseDto } from 'apps/event/src/event/dto/api-test-activity-log-response.dto';
import { EventListItemDto } from 'apps/event/src/event/dto/event-list-item.dto';
import { ApiReceiveGetListResponseDto } from 'apps/event/src/event/receive/dto/api-receive-get-list-response.dto';
import { ReceiveItemDto } from 'apps/event/src/event/receive/dto/receive-item.dto';
import { AuthProxyController } from 'apps/gateway/src/auth/auth-proxy.controller';
import { UserProxyController } from 'apps/gateway/src/auth/user-proxy.controller';
import { DevProxyController } from 'apps/gateway/src/event/dev-proxy.controller';
import { EventProxyController } from 'apps/gateway/src/event/event-proxy.controller';
import { ReceiveProxyController } from 'apps/gateway/src/event/receive-proxy.controller';

export const SwaggerModels = [
  ApiUserGetDetailResponseDto,
  ApiUserGetResponseDto,
  ApiUserPatchRoleResponseDto,
  ApiAuthPostLoginResponseDto,
  ApiAuthPostLogoutResponseDto,
  ApiAuthPostRefreshResponseDto,
  ApiAuthPostSignupResponseDto,
  ApiEventPostResponseDto,
  ApiEventPostRewardResponseDto,
  UserItemsDto,
  ApiEventGetDetailResponseDto,
  ApiEventGetListResponseDto,
  EventListItemDto,
  ApiReceiveGetListResponseDto,
  ReceiveItemDto,
  ApiEventPostReceiveResponseDto,
  ApiEventPatchResponseDto,
  ApiEventPatchRewardResponseDto,
  ApiTestActivityLogResponseDto,
  UserProxyController,
  DevProxyController,
  ReceiveProxyController,
  AuthProxyController,
  EventProxyController,
];
