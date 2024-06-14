import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permission } from '../user/entities/permission.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return true;
    }
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permission', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const permissions: Permission[] = request.user.permissions;

    for (let i = 0; i < requiredPermissions.length; i++) {
      const target = requiredPermissions[i];
      const found = permissions.find((element) => {
        return element.code === target;
      });
      if (!found) {
        throw new ForbiddenException('Access denied');
      }
    }

    return true;
  }
}
