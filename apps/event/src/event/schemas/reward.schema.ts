import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardType } from 'apps/event/src/constants/reward-type';
import { Document, Types } from 'mongoose';
import { Event } from './event.schema';

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Reward extends Document {
  @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
  eventId: Types.ObjectId;

  @Prop({ type: String, enum: Object.values(RewardType), required: true })
  type: RewardType;

  // 포인트명／아이템명／쿠폰코드 등
  @Prop()
  name?: string;

  @Prop({ required: true, min: 1 })
  amount: number;
}

export type RewardDocument = Reward & Document;
export const RewardSchema = SchemaFactory.createForClass(Reward);

// 이벤트별 보상 타입 중복 방지
RewardSchema.index({ eventId: 1, type: 1 }, { unique: true });
