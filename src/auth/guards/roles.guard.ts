import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from 'src/decorators/permitted-roles.decorator';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const isPermitted = req.user?.roles.some((r: Role) =>
      requiredRoles.include(r.value),
    );

    if (!isPermitted) {
      throw new ForbiddenException({
        message: 'Access denied',
      });
    }

    return true;
  }
}
