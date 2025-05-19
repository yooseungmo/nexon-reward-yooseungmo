import { ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from 'apps/event/src/constants/event-status';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ApiEventGetListQueryRequestDto {
  @ApiPropertyOptional({ example: 1, description: '페이지 번호 (1부터)' })
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

  @ApiPropertyOptional({ description: '이벤트명 부분 검색' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: EventStatus, description: '이벤트 상태 필터' })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
