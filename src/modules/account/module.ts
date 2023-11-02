import { Module } from '@nestjs/common';
import { AccountController } from './controller';
import { AccountService } from './service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
