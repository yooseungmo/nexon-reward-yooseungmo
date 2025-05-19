import { ApiPropertyOptional } from '@nestjs/swagger';
import { RewardReceiveStatus } from 'apps/event/src/constants/reward-receive-status';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ApiReceiveGetListQueryRequestDto {
  @ApiPropertyOptional({ example: 1, description: '페이지 번호' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? Number(value) : 1))
  page: number;

  @ApiPropertyOptional({ example: 10, description: '페이지 크기' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? Number(value) : 10))
  limit: number;

  @ApiPropertyOptional({ description: 'Event ID로 필터링' })
  @IsOptional()
  @IsString()
  eventId?: string;

  @ApiPropertyOptional({ enum: RewardReceiveStatus, description: '상태 필터 (SUCCESS, FAILURE)' })
  @IsOptional()
  @IsEnum(RewardReceiveStatus)
  status?: RewardReceiveStatus;
}
