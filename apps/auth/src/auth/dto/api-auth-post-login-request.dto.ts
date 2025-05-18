import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ApiAuthPostLoginRequestDto {
  @ApiProperty({ example: 'blanc@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'blanc12332' })
  @IsString()
  password: string;
}
