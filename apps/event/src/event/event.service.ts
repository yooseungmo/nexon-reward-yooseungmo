import { isEmpty, isNotEmpty, Role, UserDto } from '@app/common';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventStatus } from 'apps/event/src/constants/event-status';
import { RewardType } from 'apps/event/src/constants/reward-type';
import { ApiEventGetDetailResponseDto } from 'apps/event/src/event/dto/api-event-get-detail-response.dto';
import { ApiEventGetListQueryRequestDto } from 'apps/event/src/event/dto/api-event-get-list-query-request.dto';
import { ApiEventGetListResponseDto } from 'apps/event/src/event/dto/api-event-get-list-response.dto';
import { ApiEventPatchRequestDto } from 'apps/event/src/event/dto/api-event-patch-request.dto';
import { ApiEventPatchResponseDto } from 'apps/event/src/event/dto/api-event-patch-response.dto';
import { ApiEventPostReceiveResponseDto } from 'apps/event/src/event/dto/api-event-post-receive-response.dto';
import { EventListItemDto } from 'apps/event/src/event/dto/event-list-item.dto';
import { MissionService } from 'apps/event/src/event/mission/mission.service';
import { EventRepository } from 'apps/event/src/event/repositories/event.repository';
import { RewardReceiveRepository } from 'apps/event/src/event/repositories/reward-receive.repository';
import { RewardRepository } from 'apps/event/src/event/repositories/reward.repository';
import { plainToInstance } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiEventPostRequestDto } from './dto/api-event-post-request.dto';
import { ApiEventPostResponseDto } from './dto/api-event-post-response.dto';
import { ApiEventPostRewardRequestDto } from './dto/api-event-post-reward-request.dto';
import { ApiEventPostRewardResponseDto } from './dto/api-event-post-reward-response.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly rewardRepository: RewardRepository,
    private readonly missionService: MissionService,
    private readonly rewardReceiveRepository: RewardReceiveRepository,
  ) {}

  async createEvent(dto: ApiEventPostRequestDto, user: UserDto): Promise<ApiEventPostResponseDto> {
    const data = await this.eventRepository.create({
      name: dto.name,
      description: dto.description,
      missionTask: { missionType: dto.missionType, threshold: dto.threshold },
      startAt: new Date(dto.startAt),
      endAt: new Date(dto.endAt),
      status: EventStatus.INACTIVE,
      createdBy: {
        userId: new Types.ObjectId(user.userId),
        role: user.roles[0] as Role,
      },
    });
    return plainToInstance(ApiEventPostResponseDto, data, { excludeExtraneousValues: true });
  }

  async addReward(
    eventId: string,
    dto: ApiEventPostRewardRequestDto,
  ): Promise<ApiEventPostRewardResponseDto> {
    const event = await this.eventRepository.findById(eventId);
    if (isEmpty(event)) throw new NotFoundException('이벤트를 찾을 수 없습니다.');

    const existReward = await this.rewardRepository.existsByEventId(eventId);
    if (isNotEmpty(existReward)) {
      throw new ConflictException('해당 이벤트에 이미 보상이 등록되어 있습니다.');
    }

    const reward = await this.rewardRepository.create({
      eventId,
      type: dto.type as RewardType,
      name: dto.name,
      amount: dto.amount,
    });

    await this.eventRepository.updateStatus(eventId, EventStatus.ACTIVE);

    return plainToInstance(ApiEventPostRewardResponseDto, reward, {
      excludeExtraneousValues: true,
    });
  }

  async getEvents(query: ApiEventGetListQueryRequestDto): Promise<ApiEventGetListResponseDto> {
    const { items, total } = await this.eventRepository.findPaginated(query);
    const dtoItems = plainToInstance(EventListItemDto, items, {
      excludeExtraneousValues: true,
    });
    return new ApiEventGetListResponseDto({
      items: dtoItems,
      total,
    });
  }

  async getEventDetail(id: string): Promise<ApiEventGetDetailResponseDto> {
    const event = await this.eventRepository.findById(id);
    if (isEmpty(event)) throw new NotFoundException('이벤트를 찾을 수 없습니다.');

    const reward = await this.rewardRepository.existsByEventId(id);

    const eventWithReward = { ...event.toObject(), reward };
    return plainToInstance(ApiEventGetDetailResponseDto, eventWithReward, {
      excludeExtraneousValues: true,
    });
  }

  async receiveReward(userId: string, eventId: string): Promise<ApiEventPostReceiveResponseDto> {
    // 1) 이벤트 조회 및 상태 확인
    const event = await this.eventRepository.findById(eventId);
    if (isEmpty(event)) {
      throw new NotFoundException('이벤트가 존재하지 않습니다.');
    }
    if (event.status !== EventStatus.ACTIVE) {
      throw new ForbiddenException('이벤트가 활성 상태가 아닙니다');
    }

    // 2) 보상 조회
    const reward = await this.rewardRepository.existsByEventId(eventId);
    if (isEmpty(reward)) {
      throw new NotFoundException('보상이 존재하지 않습니다');
    }

    try {
      // 3) 중복 요청 방지
      if (await this.rewardReceiveRepository.existsSuccess(userId, eventId)) {
        throw new ConflictException('이미 보상을 받았습니다.');
      }

      // 4) 미션 검증 및 SUCCESS 레코드 생성
      const userRewardReceive = await this.missionService.completeMission(userId, event, reward.id);

      // 5) DTO 변환 및 반환
      return plainToInstance(ApiEventPostReceiveResponseDto, userRewardReceive, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      // 6) 미션 검증 실패(Forbidden)나 SUCCESS 중복 요청(Conflict) 모두 FAILURE로 기록
      await this.rewardReceiveRepository.failure({
        userId,
        eventId,
        rewardId: reward.id,
      });

      throw err;
    }
  }

  async updateEvent(id: string, dto: ApiEventPatchRequestDto): Promise<ApiEventPatchResponseDto> {
    const existing = await this.eventRepository.findById(id);
    if (isEmpty(existing)) {
      throw new NotFoundException('수정할 이벤트가 존재하지 않습니다.');
    }

    if (isNotEmpty(dto.name)) existing.name = dto.name;
    if (isNotEmpty(dto.description)) existing.description = dto.description;
    if (isNotEmpty(dto.missionType)) existing['missionTask.missionType'] = dto.missionType;
    if (isNotEmpty(dto.threshold)) existing['missionTask.threshold'] = dto.threshold;
    if (isNotEmpty(dto.startAt)) existing.startAt = new Date(dto.startAt);
    if (isNotEmpty(dto.endAt)) existing.endAt = new Date(dto.endAt);
    if (isNotEmpty(dto.status)) existing.status = dto.status;

    const updated = await this.eventRepository.update(id, existing);

    return plainToInstance(
      ApiEventPatchResponseDto,
      { ...updated, result: 'SUCCESS' },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async deleteEvent(id: string): Promise<void> {
    const existing = await this.eventRepository.findById(id);
    if (isEmpty(existing)) {
      throw new NotFoundException('삭제할 이벤트가 존재하지 않습니다.');
    }

    await this.eventRepository.delete(id);
  }
}
