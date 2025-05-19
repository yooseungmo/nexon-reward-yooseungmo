import { isEmpty } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MissionType } from 'apps/event/src/constants/mission-type.enum';
import { ApiEventGetProgressResponseDto } from 'apps/event/src/event/dto/api-event-get-progress-response..dto';
import { EventProgressItemDto } from 'apps/event/src/event/dto/event-progress-item.dto';
import { FriendInviteStrategy } from 'apps/event/src/event/mission/strategy/friend-invite.strategy';
import { MesoSpendStrategy } from 'apps/event/src/event/mission/strategy/meso-spend.strategy';
import { MonsterKillStrategy } from 'apps/event/src/event/mission/strategy/monster-kill.strategy';
import { PartyQuestStrategy } from 'apps/event/src/event/mission/strategy/party-quest.strategy';
import { SocialShareStrategy } from 'apps/event/src/event/mission/strategy/social-share.strategy';
import { EventRepository } from 'apps/event/src/event/repositories/event.repository';
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
    private readonly eventRepository: EventRepository,
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

  /** 유저 미션 진행도 한 번에 조회 */
  async getAllProgress(userId: string): Promise<ApiEventGetProgressResponseDto> {
    const events = await this.eventRepository.findActive();

    const items: EventProgressItemDto[] = await Promise.all(
      events.map(async (e) => {
        const { id, name, missionTask } = e;
        const { missionType, threshold } = missionTask;

        const userCount =
          await this.strategies[missionType as MissionTaskType].performCount(userId);

        return {
          id,
          name,
          missionType,
          threshold,
          userCount,
        } as EventProgressItemDto;
      }),
    );

    return { items };
  }
}
