import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardReceiveStatus } from 'apps/event/src/constants/reward-receive-status';
import { Reward } from 'apps/event/src/event/schemas/reward.schema';
import { Document, Types } from 'mongoose';
import { Event } from './event.schema';

@Schema({ timestamps: true })
export class RewardReceive extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Reward.name, required: true })
  rewardId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(RewardReceiveStatus),
    required: true,
    default: RewardReceiveStatus.SUCCESS,
  })
  status: RewardReceiveStatus;
}

export type RewardReceiveDocument = RewardReceive & Document;
export const RewardReceiveSchema = SchemaFactory.createForClass(RewardReceive);

// 한 유저가 같은 rewardId 로 성공 요청은 한 번만
RewardReceiveSchema.index(
  { userId: 1, rewardId: 1 },
  {
    unique: true,
    partialFilterExpression: { status: RewardReceiveStatus.SUCCESS },
  },
);

RewardReceiveSchema.index({ status: 1, createdAt: 1 });
