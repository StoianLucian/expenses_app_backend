import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.AUTH_TOKEN,
      ]),
      ignoreExpiration: false,
      secretOrKey: 'test2',
    });
  }

  validate(payload: any) {
    console.log('jwt');
    return payload;
  }
}
