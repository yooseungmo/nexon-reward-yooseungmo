import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from '../schemas/reward.schema';

@Injectable()
export class RewardRepository {
  constructor(@InjectModel(Reward.name) private readonly model: Model<RewardDocument>) {}

  async create(data: {
    eventId: string;
    type: Reward['type'];
    name?: string;
    amount: number;
  }): Promise<RewardDocument> {
    const created = await this.model.create(data);
    return created;
  }

  async existsByEventId(eventId: string): Promise<RewardDocument | null> {
    return this.model.findOne({ eventId }).exec();
  }
}
