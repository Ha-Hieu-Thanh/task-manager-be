import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { LoginDto, SignUpDto } from './dto';
import { User } from '@shared/models/user.entity';
import { EntityManager } from 'typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { EEnvKey, IJwtPayload } from '@constants/constant';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const { username, password } = data;
    const user = await this.entityManager.getRepository(User).findOne({
      where: {
        username,
      },
    });

    if (user) {
      if (compareSync(password, user.password)) {
        return await this.getToken({
          userId: user.id,
          type: user.type,
        });
      } else {
        throw new UnauthorizedException({
          message: 'Password wrong',
        });
      }
    }

    throw new NotFoundException({
      message: 'User was not existed in system',
    });
  }

  async signUp(data: SignUpDto) {
    // check user existed
    const user = await this.entityManager.getRepository(User).findOne({
      where: {
        phone: data.phone,
        email: data.email,
        username: data.username,
      },
    });

    if (user) {
      throw new UnauthorizedException({
        message:
          'User is already in the system please go back to login or create different account with new phone number and email',
      });
    } else {
      const newUser = await this.entityManager.getRepository(User).save({
        ...data,
        password: hashSync(data.password, genSaltSync(10)),
      });

      return await this.getToken({
        userId: newUser.id,
        type: newUser.type,
      });
    }
  }

  async refresh(payload: IJwtPayload) {
    return await this.getToken(payload);
  }

  async getToken(payload: IJwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(EEnvKey.JWT_ACCESS_TOKENS_SECRETS),
      expiresIn: this.configService.get<string>(
        EEnvKey.JWT_ACCESS_TOKENS_EXPIRES,
      ),
    });
  }

  async generateRefreshToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(
        EEnvKey.JWT_REFRESH_TOKENS_SECRETS,
      ),
      expiresIn: this.configService.get<string>(
        EEnvKey.JWT_REFRESH_TOKENS_EXPIRES,
      ),
    });
  }
}
