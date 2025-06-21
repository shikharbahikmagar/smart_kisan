// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';
import { decodeToken } from 'src/modules/auth/jwt.strategy';
import { PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const userData = this.getToken(request);

    request.user = userData;

    return true;
  }

  private getToken(req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('No authorization header provided');
    }

    const token = authHeader && authHeader.split(' ')[1];

    // console.log('token', token);

    const decodedToken = decodeToken(token);

    // console.log('decodedToken', decodedToken);

    if (!decodedToken.isValid) {
      throw new ForbiddenException('No token provided');
    }

    return decodedToken.data;
  }
}
