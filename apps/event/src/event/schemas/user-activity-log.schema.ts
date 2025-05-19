import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MissionType } from 'apps/event/src/constants/mission-type.enum';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class UserActivityLog extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: MissionType, required: true })
  type: MissionType;

  @Prop({ type: Number, default: 1, min: 1 })
  value: number;
}

export type UserActivityLogDocument = UserActivityLog & Document;
export const UserActivityLogSchema = SchemaFactory.createForClass(UserActivityLog);
UserActivityLogSchema.index({ userId: 1, type: 1 });
UserActivityLogSchema.index({ createdAt: 1, type: 1 });
