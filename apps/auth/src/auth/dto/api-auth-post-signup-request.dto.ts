import { Role } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class ApiAuthPostSignupRequestDto {
  @ApiProperty({ example: 'blanc' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'blanc@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'blanc1233' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Role, isArray: true, example: [Role.USER] })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
