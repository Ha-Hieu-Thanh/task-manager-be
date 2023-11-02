import { Module } from '@nestjs/common';
import { IssueStateController } from './controller';
import { IssueStateService } from './service';

@Module({
  imports: [],
  controllers: [IssueStateController],
  providers: [IssueStateService],
})
export class IssueStateModule {}
