import { Role } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiAuthPatchUserRoleResponseDto {
  @Expose()
  @ApiProperty({ example: '682969c46ba7cdd450448539' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'blanc' })
  username: string;

  @Expose()
  @ApiProperty({ example: 'blanc@gmail.com' })
  email: string;

  @Expose()
  @ApiProperty({ enum: Role, isArray: true })
  roles: Role[];
}
