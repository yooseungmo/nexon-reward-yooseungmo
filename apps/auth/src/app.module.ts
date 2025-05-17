import { Module } from '@nestjs/common';
import { AuthModule } from 'apps/auth/src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
