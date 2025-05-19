import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RewardReceiveStatus } from 'apps/event/src/constants/reward-receive-status';
import {
  RewardReceive,
  RewardReceiveDocument,
} from 'apps/event/src/event/schemas/reward-receive.schema';
import { FilterQuery, Model, Types } from 'mongoose';

@Injectable()
export class RewardReceiveRepository {
  constructor(
    @InjectModel(RewardReceive.name)
    private readonly model: Model<RewardReceiveDocument>,
  ) {}

  async existsSuccess(userId: string, eventId: string): Promise<boolean> {
    const doc = await this.model
      .exists({
        userId: new Types.ObjectId(userId),
        eventId: new Types.ObjectId(eventId),
        status: RewardReceiveStatus.SUCCESS,
      })
      .exec();
    return !!doc;
  }

  async create(data: {
    userId: string;
    eventId: string;
    rewardId: string;
  }): Promise<RewardReceiveDocument> {
    try {
      const created = await this.model.create({
        ...data,
        status: RewardReceiveStatus.SUCCESS,
        completedAt: new Date(),
      });
      return created;
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  async failure(data: {
    userId: string;
    eventId: string;
    rewardId: string;
  }): Promise<RewardReceiveDocument> {
    try {
      const created = await this.model.create({
        ...data,
        status: RewardReceiveStatus.FAILURE,
        completedAt: new Date(),
      });
      return created;
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  async findPaginated(params: {
    userId?: string;
    eventId?: string;
    status?: RewardReceiveStatus;
    page: number;
    limit: number;
  }): Promise<{ items: RewardReceiveDocument[]; total: number }> {
    const { userId, eventId, status, page, limit } = params;

    const skip = (page - 1) * limit;
    const filter: FilterQuery<RewardReceiveDocument> = {};
    if (userId) filter.userId = userId;
    if (eventId) filter.eventId = eventId;
    if (status) filter.status = status;

    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('eventId')
        .populate('rewardId')
        .exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    return { items, total };
  }
}
