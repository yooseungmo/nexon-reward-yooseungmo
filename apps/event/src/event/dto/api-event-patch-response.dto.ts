import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ApiEventPostResponseDto } from './api-event-post-response.dto';

export class ApiEventPatchResponseDto extends ApiEventPostResponseDto {
  @Expose()
  @ApiProperty({ enum: ['SUCCESS'], example: 'SUCCESS' })
  result: string;
}
