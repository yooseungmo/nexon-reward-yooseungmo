import { Role } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class ApiUserPatchRoleRequestDto {
  @ApiProperty({
    enum: Role,
    example: Role.OPERATOR,
    description: '새로 부여할 역할',
  })
  @IsEnum(Role)
  role: Role;
}
