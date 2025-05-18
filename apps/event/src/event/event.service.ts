import { isEmpty, isNotEmpty, Role, UserDto } from '@app/common';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { EventStatus } from 'apps/event/src/constants/event-status';
import { RewardType } from 'apps/event/src/constants/reward-type';
import { EventRepository } from 'apps/event/src/event/repositories/event.repository';
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
    if (isEmpty(event)) throw new BadRequestException('이벤트를 찾을 수 없습니다.');

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

    // 보상 추가 후 이벤트 상태 active 처리
    await this.eventRepository.updateStatus(eventId, EventStatus.ACTIVE);

    return plainToInstance(ApiEventPostRewardResponseDto, reward, {
      excludeExtraneousValues: true,
    });
  }
}
