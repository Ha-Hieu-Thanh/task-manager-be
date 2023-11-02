import { Module } from '@nestjs/common';
import { MemberController } from './controller';
import { MemberService } from './service';

@Module({
  imports: [],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
