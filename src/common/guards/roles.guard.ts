// roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
  
      if (!requiredRoles || requiredRoles.length === 0) {
        return true; // No roles required, allow access
      }
  
      const { user } = context.switchToHttp().getRequest();
     
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('You do not have permission to access this resource');
      }
  
      return true;
    }
  }
  