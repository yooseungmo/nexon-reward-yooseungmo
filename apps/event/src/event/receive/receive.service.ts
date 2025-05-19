import { Injectable } from '@nestjs/common';
import { ApiReceiveGetListQueryRequestDto } from 'apps/event/src/event/receive/dto/api-receive-get-list-query-request.dto';
import { ApiReceiveGetListResponseDto } from 'apps/event/src/event/receive/dto/api-receive-get-list-response.dto';
import { ReceiveItemDto } from 'apps/event/src/event/receive/dto/receive-item.dto';
import { RewardReceiveRepository } from 'apps/event/src/event/repositories/reward-receive.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ReceiveService {
  constructor(private readonly repository: RewardReceiveRepository) {}

  async getMyReceives(
    userId: string,
    query: ApiReceiveGetListQueryRequestDto,
  ): Promise<ApiReceiveGetListResponseDto> {
    const { items, total } = await this.repository.findPaginated({
      userId,
      page: query.page,
      limit: query.limit,
      eventId: query.eventId,
      status: query.status,
    });

    const dtoItems = plainToInstance(ReceiveItemDto, items, {
      excludeExtraneousValues: true,
    });

    return new ApiReceiveGetListResponseDto({
      items: dtoItems,
      total,
    });
  }

  async getAllReceives(
    query: ApiReceiveGetListQueryRequestDto,
  ): Promise<ApiReceiveGetListResponseDto> {
    const { items, total } = await this.repository.findPaginated({
      userId: undefined,
      page: query.page,
      limit: query.limit,
      eventId: query.eventId,
      status: query.status,
    });

    const dtoItems = plainToInstance(ReceiveItemDto, items, {
      excludeExtraneousValues: true,
    });

    return new ApiReceiveGetListResponseDto({
      items: dtoItems,
      total,
    });
  }
}
