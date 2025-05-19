import { ApiProperty } from '@nestjs/swagger';
import { MissionType } from 'apps/event/src/constants/mission-type.enum';
import { IsEnum, IsNumber, Min } from 'class-validator';

export class ApiTestActivityLogRequestDto {
  @ApiProperty({ enum: MissionType, example: MissionType.SOCIAL_SHARE })
  @IsEnum(MissionType)
  missionType: MissionType;

  @ApiProperty({ description: '증가할 값', example: 1 })
  @IsNumber()
  @Min(1)
  value: number;
}
