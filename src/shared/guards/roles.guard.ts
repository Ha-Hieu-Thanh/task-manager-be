import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { EGuardDecoratorKey } from '@constants/constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(
      EGuardDecoratorKey.ROLES,
      context.getHandler(),
    );
    if (!roles) return true;

    const user = context.switchToHttp().getRequest().user;
    return roles.some((role) => role === user.type);
  }
}
