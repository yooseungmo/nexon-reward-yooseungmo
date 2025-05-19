import { JwtStrategy } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MesoSpendStrategy } from 'apps/event/src/event/mission/strategy/meso-spend.strategy';
import { MonsterKillStrategy } from 'apps/event/src/event/mission/strategy/monster-kill.strategy';
import { PartyQuestStrategy } from 'apps/event/src/event/mission/strategy/party-quest.strategy';
import { SocialShareStrategy } from 'apps/event/src/event/mission/strategy/social-share.strategy';
import {
  UserActivityLog,
  UserActivityLogSchema,
} from 'apps/event/src/event/schemas/user-activity-log.schema';

import { MissionService } from 'apps/event/src/event/mission/mission.service';
import { FriendInviteStrategy } from 'apps/event/src/event/mission/strategy/friend-invite.strategy';
import { EventRepository } from 'apps/event/src/event/repositories/event.repository';
import { RewardReceiveRepository } from 'apps/event/src/event/repositories/reward-receive.repository';
import { RewardRepository } from 'apps/event/src/event/repositories/reward.repository';
import { UserActivityLogRepository } from 'apps/event/src/event/repositories/user-activity-log.repository';
import {
  RewardReceive,
  RewardReceiveSchema,
} from 'apps/event/src/event/schemas/reward-receive.schema';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from './schemas/event.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: RewardReceive.name, schema: RewardReceiveSchema },
      { name: UserActivityLog.name, schema: UserActivityLogSchema },
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
  providers: [
    EventService,
    MissionService,
    EventRepository,
    RewardRepository,
    RewardReceiveRepository,
    UserActivityLogRepository,
    FriendInviteStrategy,
    MonsterKillStrategy,
    PartyQuestStrategy,
    SocialShareStrategy,
    MesoSpendStrategy,
    JwtStrategy,
  ],
})
export class EventModule {}
