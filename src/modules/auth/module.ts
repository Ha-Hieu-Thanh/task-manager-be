import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import { AuthService } from './service';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from '@shared/jwt/access-token.strategy';
import { RefreshTokenStrategy } from '@shared/jwt/refresh-token-strategy';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
