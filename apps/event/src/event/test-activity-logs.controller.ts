import { CurrentUser, JwtAuthGuard, Rbac, RbacGuard, Role, UserDto } from '@app/common';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTestActivityLogRequestDto } from 'apps/event/src/event/dto/api-test-activity-log-request.dto';
import { ApiTestActivityLogResponseDto } from 'apps/event/src/event/dto/api-test-activity-log-response.dto';
import { UserActivityLogRepository } from 'apps/event/src/event/repositories/user-activity-log.repository';
import { plainToInstance } from 'class-transformer';

@ApiTags('Dev')
@Controller('test/activity-logs')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
export class TestActivityLogsController {
  constructor(private readonly userActivityLogRepository: UserActivityLogRepository) {}

  @Post()
  @Rbac(Role.USER)
  @ApiOperation({
    summary: '개발용 유저 활동 로그 생성',
    description: 'MONSTER_KILL|PARTY_QUEST|FRIEND_INVITE|SOCIAL_SHARE|MESO_SPEND',
  })
  @ApiBody({ type: ApiTestActivityLogRequestDto })
  @ApiResponse({ status: 200, type: ApiTestActivityLogResponseDto })
  async create(
    @Body() dto: ApiTestActivityLogRequestDto,
    @CurrentUser() user: UserDto,
  ): Promise<ApiTestActivityLogResponseDto> {
    return plainToInstance(
      ApiTestActivityLogResponseDto,
      await this.userActivityLogRepository.create(user.userId, dto.missionType, dto.value),
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
