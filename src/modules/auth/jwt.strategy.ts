import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from 'src/constants/enum/user-role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      throw new UnauthorizedException('JWT secret is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  
  async validate(payload: { sub: number; email: string, role: UserRole }) {
    // This method runs if the token is valid
    return { userId: payload.sub, email: payload.email, role: payload.role }; // this is attached to req.user
  }
}
