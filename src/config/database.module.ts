import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EEnvKey } from '@constants/constant';
import { User } from '@shared/models/user.entity';
import { Project } from '@shared/models/project.entity';
import { UserProject } from '@shared/models/user-project.entity';
import { Issue } from '@shared/models/issue.entity';
import { IssueCategory } from '@shared/models/issue-category.entity';
import { IssueState } from '@shared/models/issue-state.entity';
import { IssueType } from '@shared/models/issue-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(EEnvKey.MYSQL_HOST),
        port: parseInt(configService.get<string>(EEnvKey.MYSQL_PORT)),
        username: configService.get<string>(EEnvKey.MYSQL_USERNAME),
        password: configService.get<string>(EEnvKey.MYSQL_PASSWORD),
        database: configService.get<string>(EEnvKey.MYSQL_DB),
        entities: [
          User,
          Project,
          UserProject,
          Issue,
          IssueCategory,
          IssueState,
          IssueType,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
