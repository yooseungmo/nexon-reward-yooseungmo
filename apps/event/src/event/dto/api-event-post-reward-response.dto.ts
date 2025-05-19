import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'apps/event/src/constants/reward-type';
import { Expose } from 'class-transformer';

export class ApiEventPostRewardResponseDto {
  @Expose()
  @ApiProperty({ example: '60f6c0d7b1234c001c9d4e5f' })
  id: string;

  @Expose()
  @ApiProperty({ example: '60f6c0d7b1234c001c9d4e5f' })
  eventId: string;

  @Expose()
  @ApiProperty({ enum: RewardType })
  type: RewardType;

  @Expose()
  @ApiProperty({ example: '메이플 포인트', required: false })
  name?: string;

  @Expose()
  @ApiProperty({ example: 100 })
  amount: number;
}
