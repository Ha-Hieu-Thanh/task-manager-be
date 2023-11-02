import { Module } from '@nestjs/common';
import { IssueCategoryController } from './controller';
import { IssueCategoryService } from './service';

@Module({
  imports: [],
  controllers: [IssueCategoryController],
  providers: [IssueCategoryService],
})
export class IssueCategoryModule {}
