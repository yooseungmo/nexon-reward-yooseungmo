import { Role } from '@app/common';

export const RoleHierarchy: Readonly<Record<Role, readonly Role[]>> = {
  [Role.ADMIN]: [Role.ADMIN, Role.OPERATOR, Role.AUDITOR, Role.USER],
  [Role.OPERATOR]: [Role.OPERATOR, Role.USER],
  [Role.AUDITOR]: [Role.AUDITOR],
  [Role.USER]: [Role.USER],
};
