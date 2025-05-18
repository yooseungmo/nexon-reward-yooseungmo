import { Role } from '@app/common';

export const RolePriority: Record<Role, number> = {
  [Role.USER]: 1,
  [Role.AUDITOR]: 2,
  [Role.OPERATOR]: 3,
  [Role.ADMIN]: 4,
};

export const RoleHierarchy: Readonly<Record<Role, readonly Role[]>> = {
  [Role.ADMIN]: [Role.ADMIN, Role.OPERATOR, Role.AUDITOR, Role.USER],
  [Role.OPERATOR]: [Role.OPERATOR, Role.USER],
  [Role.AUDITOR]: [Role.AUDITOR],
  [Role.USER]: [Role.USER],
} as const;
