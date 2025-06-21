// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/constants/enum/user-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [UserRole, ...UserRole[]]) =>
  SetMetadata(ROLES_KEY, roles);
