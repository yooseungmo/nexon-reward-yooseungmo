import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from 'apps/event/src/constants/event-status';
import { Expose } from 'class-transformer';
import { MissionType } from '../../constants/mission-type.enum';

export class ApiEventPostResponseDto {
  @Expose()
  @ApiProperty({ example: '60f6c0d7b1234c001c9d4e5f' })
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description?: string;

  @Expose()
  @ApiProperty({ enum: MissionType })
  missionType: MissionType;

  @Expose()
  @ApiProperty({ example: 7 })
  threshold: number;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  startAt: Date;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  endAt: Date;

  @Expose()
  @ApiProperty({ enum: EventStatus })
  status: EventStatus;
}
