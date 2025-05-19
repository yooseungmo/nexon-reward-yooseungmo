import { Role } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventStatus } from 'apps/event/src/constants/event-status';
import { MissionType } from 'apps/event/src/constants/mission-type.enum';
import { Document, Types } from 'mongoose';

export interface MissionTask {
  missionType: MissionType;
  threshold: number;
}

export interface CreatedByMeta {
  userId: Types.ObjectId;
  role: Role;
}

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({
    type: {
      missionType: { type: String, enum: Object.values(MissionType), required: true },
      threshold: { type: Number, required: true, min: 1 },
    },
    _id: false,
    required: true,
  })
  missionTask: MissionTask;

  @Prop({ type: Date, required: true })
  startAt: Date;

  @Prop({ type: Date, required: true })
  endAt: Date;

  @Prop({ type: String, enum: Object.values(EventStatus), default: EventStatus.INACTIVE })
  status: EventStatus;

  @Prop({
    type: {
      userId: { type: Types.ObjectId, ref: 'User', required: true },
      role: { type: String, enum: Object.values(Role), required: true },
    },
    _id: false,
    required: true,
  })
  createdBy: CreatedByMeta;
}

export type EventDocument = Document & Event;

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.index({ startAt: 1, endAt: 1 });
EventSchema.index({ status: 1 });
