import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'apps/event/src/constants/reward-type';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ApiEventPostRewardRequestDto {
  @IsEnum(RewardType)
  @ApiProperty({ enum: RewardType, example: RewardType.POINT })
  type: RewardType;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '가입 보너스', required: false })
  name?: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 100, description: '포인트 수량 또는 아이템 수량' })
  amount: number;
}
