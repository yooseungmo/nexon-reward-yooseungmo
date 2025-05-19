import { ApiProperty } from '@nestjs/swagger';
import { RewardReceiveStatus } from 'apps/event/src/constants/reward-receive-status';
import { Expose } from 'class-transformer';

export class ApiEventPostReceiveResponseDto {
  @Expose()
  @ApiProperty({ description: 'Receive ID' })
  id: string;

  @Expose()
  @ApiProperty({ description: 'User ID' })
  userId: string;

  @Expose()
  @ApiProperty({ description: 'Event ID' })
  eventId: string;

  @Expose()
  @ApiProperty({ description: 'Reward ID' })
  rewardId: string;

  @Expose()
  @ApiProperty({ enum: RewardReceiveStatus })
  status: RewardReceiveStatus;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  completedAt: Date;
}
