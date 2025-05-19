import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { RewardType } from '../../constants/reward-type';

export class ApiEventPatchRewardRequestDto {
  @ApiPropertyOptional({ enum: RewardType, description: '보상 종류' })
  @IsOptional()
  @IsEnum(RewardType)
  type?: RewardType;

  @ApiPropertyOptional({ description: '보상 이름', example: '메이플 포인트' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '수량', example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  amount?: number;
}
