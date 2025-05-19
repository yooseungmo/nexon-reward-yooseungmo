import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MissionType } from '../../constants/mission-type.enum';

export class ApiEventPostRequestDto {
  @ApiProperty({ example: '링크 공유 3회 완료' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '미션 달성 시 100포인트 지급', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ enum: MissionType, example: MissionType.SOCIAL_SHARE })
  @IsEnum(MissionType)
  missionType: MissionType;

  @ApiProperty({ example: 7, description: '달성 기준 일 수' })
  @IsNumber()
  threshold: number;

  @ApiProperty({ type: String, format: 'date-time', example: '2025-05-18T22:15:01.358Z' })
  @IsDateString()
  startAt: string;

  @ApiProperty({ type: String, format: 'date-time', example: '2025-05-25T22:15:01.358Z' })
  @IsDateString()
  endAt: string;
}
