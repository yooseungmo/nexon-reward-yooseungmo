import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MissionType } from '../../constants/mission-type.enum';

export class ApiTestActivityLogResponseDto {
  @Expose()
  @ApiProperty({ description: '로그 ID' })
  id: string;

  @Expose()
  @ApiProperty({ enum: MissionType, description: '미션 타입' })
  type: MissionType;

  @Expose()
  @ApiProperty({ description: '값', example: 1 })
  value: number;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time', description: '생성일시' })
  createdAt: Date;
}
