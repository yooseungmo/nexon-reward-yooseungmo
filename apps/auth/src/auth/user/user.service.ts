import { isEmpty } from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserMongoRepository } from 'apps/auth/src/auth/user.mongo.repository';
import { ApiUserGetDetailResponseDto } from 'apps/auth/src/auth/user/dto/api-user-get-detail-response.dto';
import { ApiUserGetQueryRequestDto } from 'apps/auth/src/auth/user/dto/api-user-get-query-request.dto';
import { ApiUserGetResponseDto } from 'apps/auth/src/auth/user/dto/api-user-get-response.dto';
import { ApiUserPatchRoleRequestDto } from 'apps/auth/src/auth/user/dto/api-user-patch-role-request.dto';
import { ApiUserPatchRoleResponseDto } from 'apps/auth/src/auth/user/dto/api-user-patch-role-response.dto';
import { UserItemsDto } from 'apps/auth/src/auth/user/dto/auth-users-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserMongoRepository) {}

  async getAllUsers(query: ApiUserGetQueryRequestDto): Promise<ApiUserGetResponseDto> {
    const { items, total } = await this.repository.findPaginated(query);

    const dtoItems = plainToInstance(UserItemsDto, items, { excludeExtraneousValues: true });

    return new ApiUserGetResponseDto({
      items: dtoItems,
      total,
    });
  }

  async getUserDetail(id: string): Promise<ApiUserGetDetailResponseDto> {
    const user = await this.repository.findById(id);
    if (isEmpty(user)) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(ApiUserGetDetailResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateRole(
    id: string,
    dto: ApiUserPatchRoleRequestDto,
  ): Promise<ApiUserPatchRoleResponseDto> {
    const existUser = await this.repository.findById(id);
    if (isEmpty(existUser)) {
      throw new NotFoundException('User not found');
    }

    const user = await this.repository.updateRole(id, dto.role);

    return plainToInstance(ApiUserPatchRoleResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
