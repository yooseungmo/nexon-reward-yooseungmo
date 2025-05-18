import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardRequestStatus } from 'apps/event/src/constants/reward-request-status';
import { Reward } from 'apps/event/src/event/schemas/reward.schema';
import { Document, Types } from 'mongoose';
import { Event } from './event.schema';

@Schema({ timestamps: true })
export class RewardRequest extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Reward.name, required: true })
  rewardId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(RewardRequestStatus),
    required: true,
    default: RewardRequestStatus.SUCCESS,
  })
  status: RewardRequestStatus;
}

export type RewardRequestDocument = RewardRequest & Document;
export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);

// 한 유저가 같은 rewardId 로 성공 요청은 한 번만
RewardRequestSchema.index(
  { userId: 1, rewardId: 1 },
  {
    unique: true,
    partialFilterExpression: { status: RewardRequestStatus.SUCCESS },
  },
);

RewardRequestSchema.index({ status: 1, createdAt: 1 });
