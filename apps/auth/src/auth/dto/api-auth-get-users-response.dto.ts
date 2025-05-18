import { ApiProperty } from '@nestjs/swagger';
import { AuthUsersDto } from 'apps/auth/src/auth/dto/auth-users-dto';
import { Expose } from 'class-transformer';

export class ApiAuthGetUsersResponseDto {
  @Expose()
  @ApiProperty({ type: [AuthUsersDto] })
  items: AuthUsersDto[];

  @Expose()
  @ApiProperty({ example: 100, description: '전체 유저 수' })
  total: number;

  constructor(partial: Partial<ApiAuthGetUsersResponseDto>) {
    Object.assign(this, partial);
  }
}
