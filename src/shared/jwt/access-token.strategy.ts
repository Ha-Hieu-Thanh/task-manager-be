import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { EEnvKey, IJwtPayload } from '@constants/constant';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(EEnvKey.JWT_ACCESS_TOKENS_SECRETS),
    } as StrategyOptions);
  }

  async validate(payload: IJwtPayload) {
    return payload;
  }
}
