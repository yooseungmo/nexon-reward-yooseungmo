import { Module } from '@nestjs/common';
import { AuthController } from 'apps/auth/src/auth/auth.controller';
import { AuthService } from 'apps/auth/src/auth/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
