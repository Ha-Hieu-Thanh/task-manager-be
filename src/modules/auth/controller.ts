import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginSchema, SignUpSchema } from './validation';
import { LoginDto, SignUpDto } from './dto';
import { AJVValidationPipe } from '@shared/pipes/AJVValidationPipe';
import { AuthService } from './service';
import { RefreshTokenGuard } from '@shared/guards/refresh-token.guard';
import { AuthenticatedRequest } from '@constants/constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(new AJVValidationPipe(LoginSchema)) body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('sign-up')
  async signUp(@Body(new AJVValidationPipe(SignUpSchema)) body: SignUpDto) {
    return await this.authService.signUp(body);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Req() req: AuthenticatedRequest) {
    return await this.authService.refresh({
      userId: req.user['id'],
      type: req.user['type'],
    });
  }
}
