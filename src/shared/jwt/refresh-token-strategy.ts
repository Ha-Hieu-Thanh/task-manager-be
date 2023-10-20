import { EEnvKey, IJwtPayload } from '@constants/constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        EEnvKey.JWT_REFRESH_TOKENS_SECRETS,
      ),
    } as StrategyOptions);
  }

  async validate(payload: IJwtPayload) {
    return payload;
  }
}
