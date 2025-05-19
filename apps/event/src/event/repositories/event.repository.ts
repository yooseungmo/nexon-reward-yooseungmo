import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventStatus } from 'apps/event/src/constants/event-status';
import { ApiEventGetListQueryRequestDto } from 'apps/event/src/event/dto/api-event-get-list-query-request.dto';
import { Event, EventDocument } from 'apps/event/src/event/schemas/event.schema';
import { FilterQuery, Model, Types } from 'mongoose';

@Injectable()
export class EventRepository {
  constructor(@InjectModel(Event.name) private readonly model: Model<EventDocument>) {}

  async create(data: Partial<Event>): Promise<EventDocument> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<EventDocument | null> {
    return this.model.findOne({ _id: new Types.ObjectId(id), archivedAt: null }).exec();
  }

  async updateStatus(id: string, status: Event['status']): Promise<void> {
    await this.model.findByIdAndUpdate(id, { status }).exec();
  }

  async findPaginated(
    query: ApiEventGetListQueryRequestDto,
  ): Promise<{ items: EventDocument[]; total: number }> {
    const { page, limit, name, status } = query;
    const skip = (page - 1) * limit;
    const filter: FilterQuery<EventDocument> = { archivedAt: null };
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (status) filter.status = status;

    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec(),
    ]);
    return { items, total };
  }

  async update(id: string, updateData: Partial<Record<string, any>>): Promise<EventDocument> {
    return this.model
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id), archivedAt: null },
        { $set: updateData },
        { new: true },
      )
      .orFail()
      .exec();
  }

  /** Soft delete: archivedAt에 현재 시간 기록 */
  async delete(id: string): Promise<void> {
    await this.model
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id), archivedAt: null },
        { archivedAt: new Date() },
      )
      .exec();
  }

  async findActive(): Promise<Pick<EventDocument, 'id' | 'name' | 'missionTask'>[]> {
    return this.model
      .find({ archivedAt: null, status: EventStatus.ACTIVE })
      .select({ name: 1, missionTask: 1 })
      .exec();
  }
}
