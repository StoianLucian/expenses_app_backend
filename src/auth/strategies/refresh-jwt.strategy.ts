import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.REFRESH_TOKEN,
      ]),
      ignoreExpiration: false,
      secretOrKey: 'test2',
    });
  }

  validate(payload: any) {
    console.log('refresh');
    return payload;
  }
}
