import { ApiProperty } from '@nestjs/swagger';
import { UserItemsDto } from 'apps/auth/src/auth/user/dto/auth-users-dto';
import { Expose } from 'class-transformer';

export class ApiUserGetResponseDto {
  @Expose()
  @ApiProperty({ type: [UserItemsDto] })
  items: UserItemsDto[];

  @Expose()
  @ApiProperty({ example: 100, description: '전체 유저 수' })
  total: number;

  constructor(partial: Partial<ApiUserGetResponseDto>) {
    Object.assign(this, partial);
  }
}
