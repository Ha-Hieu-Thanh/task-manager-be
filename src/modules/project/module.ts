import { Module } from '@nestjs/common';
import { ProjectController } from './controller';
import { ProjectService } from './service';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
