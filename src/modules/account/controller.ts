import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import {
  AdminPermission,
  UserPermission,
} from '@shared/decorators/permission.decorator';
import { User } from '@shared/decorators/user.decorator';

@Controller('account')
export class AccountController {
  @AdminPermission()
  @Get('/admin')
  async getAccounts(@Query() data: any) {}

  @UserPermission()
  @Get('/me')
  async getMyAccount(@User('userId') userId: number) {}

  @UserPermission()
  @Put('/me')
  async updateMyAccount(@Body() data: any, @User('userId') userId: number) {}
}
