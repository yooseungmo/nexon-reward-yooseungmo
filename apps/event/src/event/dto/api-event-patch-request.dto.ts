import { ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from 'apps/event/src/constants/event-status';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { MissionType } from '../../constants/mission-type.enum';

export class ApiEventPatchRequestDto {
  @ApiPropertyOptional({ example: '몬스터 10마리 처치 완료', description: '이벤트 이름' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '미션 달성 시 50포인트 지급', description: '설명' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'MONSTER_KILL',
    enum: MissionType,
    description: '미션 타입',
  })
  @IsOptional()
  @IsEnum(MissionType)
  missionType?: MissionType;

  @ApiPropertyOptional({ example: 10, description: '미션 임계치' })
  @IsOptional()
  @IsNumber()
  threshold?: number;

  @ApiPropertyOptional({ description: '시작 일시', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  startAt?: string;

  @ApiPropertyOptional({ description: '종료 일시', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  endAt?: string;

  @ApiPropertyOptional({
    example: 'ACTIVE',
    enum: EventStatus,
    description: '상태',
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
