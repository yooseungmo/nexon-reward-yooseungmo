import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ApiEventPostResponseDto } from './api-event-post-response.dto';
import { ApiEventPostRewardResponseDto } from './api-event-post-reward-response.dto';

export class ApiEventGetDetailResponseDto extends ApiEventPostResponseDto {
  @Expose()
  @Type(() => ApiEventPostRewardResponseDto)
  @ApiProperty({
    type: ApiEventPostRewardResponseDto,
    description: '이벤트에 연결된 보상 (없으면 null)',
    nullable: true,
  })
  reward: ApiEventPostRewardResponseDto;
}
