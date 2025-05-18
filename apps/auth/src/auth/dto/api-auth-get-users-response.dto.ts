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

  @Expose()
  @ApiProperty({ example: 1, description: '현재 페이지 번호' })
  page: number;

  @Expose()
  @ApiProperty({ example: 10, description: '페이지 크기' })
  limit: number;
}
