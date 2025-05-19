import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    return this.model.findOne({ eventId, archivedAt: null }).exec();
  }

  async findById(id: string): Promise<RewardDocument | null> {
    return this.model.findOne({ _id: new Types.ObjectId(id), archivedAt: null }).exec();
  }

  async update(id: string, updateData: Partial<Record<string, any>>): Promise<RewardDocument> {
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
}
