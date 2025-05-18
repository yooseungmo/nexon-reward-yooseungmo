import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiAuthGetUsersQueryRequestDto } from 'apps/auth/src/auth/dto/api-auth-get-users-query-request.dto';
import { Model } from 'mongoose';
import { ApiAuthPostSignupRequestDto } from './dto/api-auth-post-signup-request.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserMongoRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: ApiAuthPostSignupRequestDto): Promise<UserDocument> {
    const exists = await this.userModel.findOne({ email: dto.email }).exec();
    if (exists) throw new ConflictException('Email already exists');
    return this.userModel.create(dto);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByRefreshToken(token: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ refreshToken: token }).exec();
  }

  async setRefreshToken(id: string, token: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { refreshToken: token }).exec();
  }

  async removeRefreshToken(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { refreshToken: null }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findPaginated(query: ApiAuthGetUsersQueryRequestDto): Promise<{
    items: UserDocument[];
    total: number;
  }> {
    const { limit, page, name } = query;

    const skip = (page - 1) * limit;
    const filter = name ? { username: { $regex: name, $options: 'i' } } : {};

    const [items, total] = await Promise.all([
      this.userModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);
    return { items, total };
  }
}
