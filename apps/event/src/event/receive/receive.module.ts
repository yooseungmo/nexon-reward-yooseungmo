import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceiveController } from 'apps/event/src/event/receive/receive.controller';
import { ReceiveService } from 'apps/event/src/event/receive/receive.service';
import { RewardReceiveRepository } from 'apps/event/src/event/repositories/reward-receive.repository';
import { RewardReceive, RewardReceiveSchema } from '../schemas/reward-receive.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RewardReceive.name, schema: RewardReceiveSchema }])],
  controllers: [ReceiveController],
  providers: [ReceiveService, RewardReceiveRepository],
  exports: [ReceiveService],
})
export class ReceiveModule {}
