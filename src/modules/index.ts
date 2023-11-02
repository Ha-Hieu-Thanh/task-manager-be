import { AccountModule } from './account/module';
import { AuthModule } from './auth/module';
import { IssueCategoryModule } from './issue-category/module';
import { IssueStateModule } from './issue-state/module';
import { IssueTypeModule } from './issue-type/module';
import { MemberModule } from './member/module';
import { ProjectModule } from './project/module';

export default [
  AuthModule,
  ProjectModule,
  AccountModule,
  IssueTypeModule,
  IssueStateModule,
  IssueCategoryModule,
  MemberModule,
];
