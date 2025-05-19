import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiEventGetListQueryRequestDto } from 'apps/event/src/event/dto/api-event-get-list-query-request.dto';
import { FilterQuery, Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class EventRepository {
  constructor(@InjectModel(Event.name) private readonly model: Model<EventDocument>) {}

  async create(data: Partial<Event>): Promise<EventDocument> {
    const created = await this.model.create(data);
    return created;
  }

  async findById(id: string): Promise<EventDocument | null> {
    const event = await this.model.findById(id).exec();
    return event;
  }

  async updateStatus(id: string, status: Event['status']): Promise<void> {
    await this.model.findByIdAndUpdate(id, { status }).exec();
  }

  async findPaginated(
    query: ApiEventGetListQueryRequestDto,
  ): Promise<{ items: EventDocument[]; total: number }> {
    const { page, limit, name, status } = query;

    const skip = (page - 1) * limit;
    const filter: FilterQuery<EventDocument> = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (status) filter.status = status;

    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec(),
    ]);
    return { items, total };
  }
}
