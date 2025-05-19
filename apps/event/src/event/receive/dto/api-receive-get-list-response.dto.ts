import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ReceiveItemDto } from './receive-item.dto';

export class ApiReceiveGetListResponseDto {
  @Expose()
  @Type(() => ReceiveItemDto)
  @ApiProperty({ type: [ReceiveItemDto] })
  items: ReceiveItemDto[];

  @Expose()
  @ApiProperty({ example: 100 })
  total: number;

  constructor(data: Partial<ApiReceiveGetListResponseDto>) {
    Object.assign(this, data);
  }
}
