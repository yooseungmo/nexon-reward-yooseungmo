import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ApiUserGetQueryRequestDto {
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

  @ApiPropertyOptional({ description: '유저명 부분 검색' })
  @IsOptional()
  @IsString()
  name?: string;
}
