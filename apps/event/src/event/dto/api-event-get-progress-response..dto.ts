import { ApiProperty } from '@nestjs/swagger';
import { EventProgressItemDto } from 'apps/event/src/event/dto/event-progress-item.dto';
import { Expose, Type } from 'class-transformer';

export class ApiEventGetProgressResponseDto {
  @Expose()
  @Type(() => EventProgressItemDto)
  @ApiProperty({ type: [EventProgressItemDto] })
  items: EventProgressItemDto[];
}
