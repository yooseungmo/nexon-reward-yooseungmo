import { ApiProperty } from '@nestjs/swagger';
import { EventListItemDto } from 'apps/event/src/event/dto/event-list-item.dto';
import { Expose, Type } from 'class-transformer';

export class ApiEventGetListResponseDto {
  @Expose()
  @Type(() => EventListItemDto)
  @ApiProperty({ type: [EventListItemDto] })
  items: EventListItemDto[];

  @Expose()
  @ApiProperty({ example: 100, description: '전체 이벤트 수' })
  total: number;

  constructor(partial: Partial<ApiEventGetListResponseDto>) {
    Object.assign(this, partial);
  }
}
