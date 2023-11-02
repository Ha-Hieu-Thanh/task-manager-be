import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { IssueCategoryService } from './service';
import { MemberPermission } from '@shared/decorators/permission.decorator';
import { AJVValidationPipe } from '@shared/pipes/AJVValidationPipe';
import {
  CreateIssueCategorySchema,
  UpdateIssueCategorySchema,
} from './validation';
import { CreateIssueCategoryDto, UpdateIssueCategoryDto } from './dto';

@Controller('issue-category')
export class IssueCategoryController {
  constructor(private readonly issueCategoryService: IssueCategoryService) {}

  @MemberPermission()
  @Get()
  async getIssueCategories(@Request() req: any) {
    return await this.issueCategoryService.getIssueCategories(
      req.headers.projectId,
    );
  }

  @MemberPermission()
  @Delete('/:issueCategoryId')
  async deleteIssueCategories(
    @Request() req: any,
    @Param('issueCategoryId') issueCategoryId: number,
  ) {
    return await this.issueCategoryService.deleteIssueCategories(
      req.headers.projectId,
      issueCategoryId,
    );
  }

  @MemberPermission()
  @Get('/:issueCategoryId')
  async getIssueCategory(
    @Request() req: any,
    @Param('issueCategoryId') issueCategoryId: number,
  ) {
    return await this.issueCategoryService.getIssueCategory(
      req.headers.projectId,
      issueCategoryId,
    );
  }

  @MemberPermission()
  @Put('/:issueCategoryId')
  async updateIssueCategory(
    @Request() req: any,
    @Param('issueCategoryId') issueCategoryId: number,
    @Body(new AJVValidationPipe(UpdateIssueCategorySchema))
    data: UpdateIssueCategoryDto,
  ) {
    return await this.issueCategoryService.updateIssueCategory(
      req.headers.projectId,
      issueCategoryId,
      data,
    );
  }

  @MemberPermission()
  @Post()
  async createIssueCategory(
    @Request() req: any,
    @Body(new AJVValidationPipe(CreateIssueCategorySchema))
    data: CreateIssueCategoryDto,
  ) {
    return await this.issueCategoryService.createIssueCategory(
      req.headers.projectId,
      data,
    );
  }
}
