import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MissionType } from '../../constants/mission-type.enum';

export class EventProgressItemDto {
  @Expose()
  @ApiProperty({ example: '60f6c0d7b1234c001c9d4e5f' })
  id: string;

  @Expose()
  @ApiProperty({ example: '7일 출석 이벤트' })
  name: string;

  @Expose()
  @ApiProperty({ enum: MissionType })
  missionType: MissionType;

  @Expose()
  @ApiProperty({ example: 3, description: '달성 임계치' })
  threshold: number;

  @Expose()
  @ApiProperty({ example: 1, description: '현재 유저 진행도' })
  userCount: number;
}
