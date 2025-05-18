import { RBAC_KEY, Role, RolePriority } from '@app/common';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required: Role[] = this.reflector.get<Role[]>(RBAC_KEY, ctx.getHandler()) || [];
    if (required.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    const { user } = req;
    if (!user?.roles) throw new ForbiddenException('권한 정보가 없습니다');

    // 최소 요구 우선순위 계산 (여러 역할을 받더라도 가장 높은 순위)
    const minPriority = Math.min(...required.map((role) => RolePriority[role]));

    // 사용자 역할 중에 우선순위 >= 요구 최소 우선순위가 있으면 통과
    const ok = user.roles.some((r: Role) => RolePriority[r] >= minPriority);
    if (!ok) throw new ForbiddenException('접근 권한이 없습니다');
    return true;
  }
}
