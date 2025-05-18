import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApiAuthPostLogoutRequestDto {
  @ApiProperty({ example: 'refresh-token-string' })
  @IsString()
  refreshToken: string;
}
