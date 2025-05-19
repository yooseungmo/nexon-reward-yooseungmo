import { CurrentUser, JwtAuthGuard, Rbac, RbacGuard, Role, UserDto } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiEventGetDetailResponseDto } from 'apps/event/src/event/dto/api-event-get-detail-response.dto';
import { ApiEventGetListQueryRequestDto } from 'apps/event/src/event/dto/api-event-get-list-query-request.dto';
import { ApiEventGetListResponseDto } from 'apps/event/src/event/dto/api-event-get-list-response.dto';
import { ApiEventGetProgressResponseDto } from 'apps/event/src/event/dto/api-event-get-progress-response..dto';
import { ApiEventPatchRequestDto } from 'apps/event/src/event/dto/api-event-patch-request.dto';
import { ApiEventPatchResponseDto } from 'apps/event/src/event/dto/api-event-patch-response.dto';
import { ApiEventPatchRewardRequestDto } from 'apps/event/src/event/dto/api-event-patch-reward-request.dto';
import { ApiEventPatchRewardResponseDto } from 'apps/event/src/event/dto/api-event-patch-reward-response.dto';
import { ApiEventPostReceiveResponseDto } from 'apps/event/src/event/dto/api-event-post-receive-response.dto';
import { ApiEventPostRequestDto } from 'apps/event/src/event/dto/api-event-post-request.dto';
import { ApiEventPostResponseDto } from 'apps/event/src/event/dto/api-event-post-response.dto';
import { ApiEventPostRewardRequestDto } from 'apps/event/src/event/dto/api-event-post-reward-request.dto';
import { ApiEventPostRewardResponseDto } from 'apps/event/src/event/dto/api-event-post-reward-response.dto';
import { EventService } from 'apps/event/src/event/event.service';
import { MissionService } from 'apps/event/src/event/mission/mission.service';

@ApiTags('Event')
@Controller('events')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly missionService: MissionService,
  ) {}

  @Post()
  @Rbac(Role.OPERATOR)
  @ApiOperation({
    summary: '이벤트 생성',
    description: 'OPERATOR 권한 필요',
  })
  @ApiBody({ type: ApiEventPostRequestDto })
  @ApiResponse({ status: 201, type: ApiEventPostResponseDto })
  async createEvent(@Body() dto: ApiEventPostRequestDto, @CurrentUser() user: UserDto) {
    return this.eventService.createEvent(dto, user);
  }

  @Post(':id/reward')
  @Rbac(Role.OPERATOR)
  @ApiOperation({
    summary: '보상 등록',
    description: 'OPERATOR 권한 필요',
  })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({ type: ApiEventPostRewardRequestDto })
  @ApiResponse({ status: 201, type: ApiEventPostRewardResponseDto })
  addReward(@Param('id') id: string, @Body() dto: ApiEventPostRewardRequestDto) {
    return this.eventService.addReward(id, dto);
  }

  @Get()
  @Rbac(Role.USER)
  @ApiOperation({
    summary: '이벤트 목록 조회',
    description: 'USER 권한 필요',
  })
  @ApiResponse({ status: 200, type: ApiEventGetListResponseDto })
  getEvents(@Query() query: ApiEventGetListQueryRequestDto): Promise<ApiEventGetListResponseDto> {
    return this.eventService.getEvents(query);
  }

  @Get(':id')
  @Rbac(Role.USER)
  @ApiOperation({ summary: '이벤트 상세 조회', description: 'USER 권한 필요' })
  @ApiResponse({ status: 200, type: ApiEventGetDetailResponseDto })
  getEventDetail(@Param('id') id: string): Promise<ApiEventGetDetailResponseDto> {
    return this.eventService.getEventDetail(id);
  }

  @Post(':id/receive')
  @Rbac(Role.USER)
  @ApiOperation({ summary: '유저 보상 요청', description: 'USER 권한 필요' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 201, type: ApiEventPostReceiveResponseDto })
  async receiveReward(
    @Param('id') eventId: string,
    @CurrentUser() user: UserDto,
  ): Promise<ApiEventPostReceiveResponseDto> {
    return this.eventService.receiveReward(user.userId, eventId);
  }

  @Patch(':id')
  @Rbac(Role.OPERATOR)
  @ApiOperation({ summary: '이벤트 수정', description: 'OPERATOR 권한 필요' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({ type: ApiEventPatchRequestDto })
  @ApiResponse({ status: 200, type: ApiEventPatchResponseDto })
  async updateEvent(
    @Param('id') id: string,
    @Body() dto: ApiEventPatchRequestDto,
  ): Promise<ApiEventPatchResponseDto> {
    return this.eventService.updateEvent(id, dto);
  }

  @Delete(':id')
  @Rbac(Role.OPERATOR)
  @ApiOperation({ summary: '이벤트 삭제', description: 'OPERATOR 권한 필요' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @HttpCode(204)
  async deleteEvent(@Param('id') id: string): Promise<void> {
    return this.eventService.deleteEvent(id);
  }

  @Patch('reward/:id')
  @Rbac(Role.OPERATOR)
  @ApiOperation({ summary: '보상 수정 ', description: 'OPERATOR 권한 필요' })
  @ApiParam({ name: 'id', description: 'Reward ID' })
  @ApiBody({ type: ApiEventPatchRewardRequestDto })
  @ApiResponse({ status: 200, type: ApiEventPatchRewardResponseDto })
  async updateReward(
    @Param('id') id: string,
    @Body() dto: ApiEventPatchRewardRequestDto,
  ): Promise<ApiEventPatchRewardResponseDto> {
    return this.eventService.updateReward(id, dto);
  }

  @Delete('reward/:id')
  @Rbac(Role.OPERATOR)
  @ApiOperation({ summary: '보상 삭제 ', description: 'OPERATOR 권한 필요' })
  @ApiParam({ name: 'id', description: 'Reward ID' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @HttpCode(204)
  async deleteReward(@Param('id') id: string): Promise<void> {
    return this.eventService.deleteReward(id);
  }

  @Get('progress/all')
  @Rbac(Role.USER)
  @ApiOperation({ summary: '유저 미션 진행도 일괄 조회 (모든 활성 이벤트)' })
  @ApiResponse({ status: 200, type: ApiEventGetProgressResponseDto })
  async getProgress(@CurrentUser() user: UserDto) {
    return this.missionService.getAllProgress(user.userId);
  }
}
