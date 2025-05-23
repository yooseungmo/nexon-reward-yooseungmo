import { Role } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiUserGetDetailResponseDto {
  @Expose()
  @ApiProperty({ example: '60f6c0d7b1234c001c9d4e5f' })
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

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date;
}
