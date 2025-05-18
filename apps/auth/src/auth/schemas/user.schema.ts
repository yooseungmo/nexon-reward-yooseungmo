import { Role } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [String],
    enum: Role,
    default: [Role.USER],
  })
  roles: Role[];

  @Prop()
  refreshToken?: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

/** 저장하기 전에 자동으로 비밀번호 해싱 */
UserSchema.pre<UserDocument>('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
