import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MissionType } from 'apps/event/src/constants/mission-type.enum';
import {
  UserActivityLog,
  UserActivityLogDocument,
} from 'apps/event/src/event/schemas/user-activity-log.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserActivityLogRepository {
  constructor(
    @InjectModel(UserActivityLog.name)
    private readonly model: Model<UserActivityLogDocument>,
  ) {}

  async sumByType(userId: string, type: MissionType): Promise<number> {
    const result = await this.model.aggregate([
      { $match: { userId: new Types.ObjectId(userId), type } },
      { $group: { _id: null, total: { $sum: '$value' } } },
    ]);
    return result[0]?.total ?? 0;
  }
}
