import { Injectable } from '@nestjs/common';

import { MissionType } from 'apps/event/src/constants/mission-type.enum';
import { UserActivityLogRepository } from '../../repositories/user-activity-log.repository';
import { AbstractMissionStrategy } from '../abstract/mission-strategy.abstract';

@Injectable()
export class MesoSpendStrategy extends AbstractMissionStrategy {
  constructor(repository: UserActivityLogRepository) {
    super(repository);
  }

  performCount(userId: string): Promise<number> {
    return this.repository.sumByType(userId, MissionType.MESO_SPEND);
  }
}
