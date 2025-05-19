import { ApiProperty } from '@nestjs/swagger';
import { ApiEventPostRewardResponseDto } from 'apps/event/src/event/dto/api-event-post-reward-response.dto';
import { Expose } from 'class-transformer';

export class ApiEventPatchRewardResponseDto extends ApiEventPostRewardResponseDto {
  @Expose()
  @ApiProperty({ enum: ['SUCCESS'], example: 'SUCCESS' })
  result: string;
}
