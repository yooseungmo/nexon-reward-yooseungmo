import { Module } from '@nestjs/common';
import { EventModule } from 'apps/event/src/event/event.module';

@Module({
  imports: [EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
