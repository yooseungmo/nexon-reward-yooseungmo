import { JwtStrategy } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRepository } from 'apps/event/src/event/repositories/event.repository';
import { RewardRepository } from 'apps/event/src/event/repositories/reward.repository';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from './schemas/event.schema';
import { RewardRequest, RewardRequestSchema } from './schemas/reward-request.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
    // 테스트 용 임시
    JwtModule.registerAsync({
      // AuthModule과 똑같이 설정
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cs.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository, RewardRepository, JwtStrategy],
})
export class EventModule {}
