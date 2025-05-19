import { isEmpty } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MissionType } from 'apps/event/src/constants/mission-type.enum';
import { FriendInviteStrategy } from 'apps/event/src/event/mission/strategy/friend-invite.strategy';
import { MesoSpendStrategy } from 'apps/event/src/event/mission/strategy/meso-spend.strategy';
import { MonsterKillStrategy } from 'apps/event/src/event/mission/strategy/monster-kill.strategy';
import { PartyQuestStrategy } from 'apps/event/src/event/mission/strategy/party-quest.strategy';
import { SocialShareStrategy } from 'apps/event/src/event/mission/strategy/social-share.strategy';
import { RewardReceiveRepository } from 'apps/event/src/event/repositories/reward-receive.repository';
import { EventDocument } from 'apps/event/src/event/schemas/event.schema';
import { RewardReceiveDocument } from 'apps/event/src/event/schemas/reward-receive.schema';
import { AbstractMissionStrategy } from './abstract/mission-strategy.abstract';

export type MissionTaskType =
  | 'FRIEND_INVITE'
  | 'MONSTER_KILL'
  | 'PARTY_QUEST'
  | 'SOCIAL_SHARE'
  | 'MESO_SPEND';

@Injectable()
export class MissionService {
  private strategies: Record<MissionTaskType, AbstractMissionStrategy>;

  constructor(
    private readonly friendInviteStrategy: FriendInviteStrategy,
    private readonly monsterKillStrategy: MonsterKillStrategy,
    private readonly partyQuestStrategy: PartyQuestStrategy,
    private readonly socialShareStrategy: SocialShareStrategy,
    private readonly mesoSpendStrategy: MesoSpendStrategy,
    private readonly rewardReceiveRepository: RewardReceiveRepository,
  ) {
    this.strategies = {
      FRIEND_INVITE: this.friendInviteStrategy,
      MONSTER_KILL: this.monsterKillStrategy,
      PARTY_QUEST: this.partyQuestStrategy,
      SOCIAL_SHARE: this.socialShareStrategy,
      MESO_SPEND: this.mesoSpendStrategy,
    };
  }

  async completeMission(
    userId: string,
    event: EventDocument,
    rewardId: string,
  ): Promise<RewardReceiveDocument> {
    const { missionType: type, threshold } = event.missionTask;

    const strategy = this.strategies[type as MissionType];
    if (isEmpty(strategy)) {
      throw new BadRequestException(`알 수 없는 미션 타입입니다: ${type}`);
    }

    await strategy.performAction(userId, threshold);

    return this.rewardReceiveRepository.create({ userId, eventId: event.id, rewardId });
  }

  // 추후 모든 미션 전체 조회
  async getMissionProgress(userId: string, type: MissionType): Promise<number> {
    const strategy = this.strategies[type];
    if (isEmpty(strategy)) {
      throw new BadRequestException(`Unknown mission type: ${type}`);
    }
    return strategy.performCount(userId);
  }
}
