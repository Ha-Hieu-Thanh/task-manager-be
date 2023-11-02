import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import {
  AdminPermission,
  UserPermission,
} from '@shared/decorators/permission.decorator';
import { User } from '@shared/decorators/user.decorator';
import { AJVValidationPipe } from '@shared/pipes/AJVValidationPipe';
import { ChangePasswordSchema, UpdateAccountSchema } from './validation';
import { ChangePasswordDto, UpdateAccountDto } from './dto';
import { AccountService } from './service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @UserPermission()
  @Get('/me')
  async getMyAccount(@User('userId') userId: number) {
    return await this.accountService.getMyAccount(userId);
  }

  @UserPermission()
  @Put('/me')
  async updateMyAccount(
    @Body(new AJVValidationPipe(UpdateAccountSchema)) data: UpdateAccountDto,
    @User('userId') userId: number,
  ) {
    return await this.accountService.updateAccount(userId, data);
  }

  @UserPermission()
  @Put('/changePassword')
  async changePassword(
    @Body(new AJVValidationPipe(ChangePasswordSchema)) data: ChangePasswordDto,
    @User('userId') userId: number,
  ) {
    return await this.accountService.changePassword(userId, data);
  }
}
