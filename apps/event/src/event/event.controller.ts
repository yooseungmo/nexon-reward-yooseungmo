import { CurrentUser, JwtAuthGuard, Rbac, RbacGuard, Role, UserDto } from '@app/common';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
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
import { ApiEventPostReceiveResponseDto } from 'apps/event/src/event/dto/api-event-post-receive-response.dto';
import { ApiEventPostRequestDto } from 'apps/event/src/event/dto/api-event-post-request.dto';
import { ApiEventPostResponseDto } from 'apps/event/src/event/dto/api-event-post-response.dto';
import { ApiEventPostRewardRequestDto } from 'apps/event/src/event/dto/api-event-post-reward-request.dto';
import { ApiEventPostRewardResponseDto } from 'apps/event/src/event/dto/api-event-post-reward-response.dto';
import { EventService } from 'apps/event/src/event/event.service';

@ApiTags('Event')
@Controller('events')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

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
    summary: '이벤트 목록 조회 [이름/상태 필터 + 페이지네이션]',
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
}
