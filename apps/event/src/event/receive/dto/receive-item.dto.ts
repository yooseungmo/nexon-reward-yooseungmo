import { ApiProperty } from '@nestjs/swagger';
import { RewardReceiveStatus } from 'apps/event/src/constants/reward-receive-status';
import { ApiEventPostRewardResponseDto } from 'apps/event/src/event/dto/api-event-post-reward-response.dto';
import { EventListItemDto } from 'apps/event/src/event/dto/event-list-item.dto';
import { Expose, Type } from 'class-transformer';

export class ReceiveItemDto {
  @Expose()
  @ApiProperty({ example: '6829...', description: 'Receive ID' })
  id: string;

  @Expose({ name: 'eventId' })
  @Type(() => EventListItemDto)
  @ApiProperty({ type: EventListItemDto })
  event: EventListItemDto;

  @Expose({ name: 'rewardId' })
  @Type(() => ApiEventPostRewardResponseDto)
  @ApiProperty({ type: ApiEventPostRewardResponseDto })
  reward: ApiEventPostRewardResponseDto;

  @Expose()
  @ApiProperty({ enum: RewardReceiveStatus })
  status: RewardReceiveStatus;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;
}
