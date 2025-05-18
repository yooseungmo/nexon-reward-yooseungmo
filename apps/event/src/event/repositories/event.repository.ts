import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
