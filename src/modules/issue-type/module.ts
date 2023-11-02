import { Module } from '@nestjs/common';
import { IssueTypeController } from './controller';
import { IssueTypeService } from './service';

@Module({
  imports: [],
  controllers: [IssueTypeController],
  providers: [IssueTypeService],
})
export class IssueTypeModule {}
