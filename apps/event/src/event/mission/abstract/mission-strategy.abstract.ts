import { ForbiddenException } from '@nestjs/common';
import { UserActivityLogRepository } from '../../repositories/user-activity-log.repository';

export abstract class AbstractMissionStrategy {
  constructor(protected readonly repository: UserActivityLogRepository) {}

  abstract performCount(userId: string): Promise<number>;

  async performAction(userId: string, threshold: number): Promise<void> {
    const count = await this.performCount(userId);
    if (count < threshold) {
      throw new ForbiddenException(
        `조건 미충족: 현재 ${count}, 최소 ${threshold} 달성 필요합니다.`,
      );
    }
  }
}
