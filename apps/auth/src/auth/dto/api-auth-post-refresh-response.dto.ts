import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiAuthPostRefreshResponseDto {
  @Expose()
  @ApiProperty({ example: 'new-access-token' })
  accessToken: string;

  @Expose()
  @ApiProperty({ example: 'new-refresh-token' })
  refreshToken: string;
}
