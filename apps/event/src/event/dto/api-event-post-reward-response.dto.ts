import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'apps/event/src/constants/reward-type';
import { Expose, Transform } from 'class-transformer';

export class ApiEventPostRewardResponseDto {
  @Expose()
  @ApiProperty({ example: '60f6c0d7b1234c001c9d4e5f' })
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.eventId.toString())
  @ApiProperty({ example: '60f6c0d7b1234c001c9d4e5f' })
  eventId: string;

  @Expose()
  @ApiProperty({ enum: RewardType })
  type: RewardType;

  @Expose()
  @ApiProperty({ example: '가입 보너스', required: false })
  name?: string;

  @Expose()
  @ApiProperty({ example: 100 })
  amount: number;
}
