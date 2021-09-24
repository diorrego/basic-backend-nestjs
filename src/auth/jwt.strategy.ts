import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpliration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    return {
      _id: payload.sub,
      username: payload.username,
      createdAt: payload.createdAt,
    };
  }
}
