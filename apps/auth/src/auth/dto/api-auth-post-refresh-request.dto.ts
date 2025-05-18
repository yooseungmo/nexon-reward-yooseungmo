import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApiAuthPostRefreshRequestDto {
  @ApiProperty({ example: 'refresh-token-string' })
  @IsString()
  refreshToken: string;
}
