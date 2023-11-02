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
import { IssueTypeService } from './service';
import { MemberPermission } from '@shared/decorators/permission.decorator';
import { AJVValidationPipe } from '@shared/pipes/AJVValidationPipe';
import { CreateIssueTypeSchema, UpdateIssueTypeSchema } from './validation';
import { CreateIssueTypeDto, UpdateIssueTypeDto } from './dto';

@Controller('issue-type')
export class IssueTypeController {
  constructor(private readonly issueTypeService: IssueTypeService) {}

  @MemberPermission()
  @Get()
  async getIssueTypes(@Request() req: any) {
    return await this.issueTypeService.getIssueTypes(req.headers.projectId);
  }

  @MemberPermission()
  @Delete('/:issueTypeId')
  async deleteIssueTypes(
    @Request() req: any,
    @Param('issueTypeId') issueTypeId: number,
  ) {
    return await this.issueTypeService.deleteIssueTypes(
      req.headers.projectId,
      issueTypeId,
    );
  }

  @MemberPermission()
  @Get('/:issueTypeId')
  async getIssueType(
    @Request() req: any,
    @Param('issueTypeId') issueTypeId: number,
  ) {
    return await this.issueTypeService.getIssueType(
      req.headers.projectId,
      issueTypeId,
    );
  }

  @MemberPermission()
  @Put('/:issueTypeId')
  async updateIssueType(
    @Request() req: any,
    @Param('issueTypeId') issueTypeId: number,
    @Body(new AJVValidationPipe(UpdateIssueTypeSchema))
    data: UpdateIssueTypeDto,
  ) {
    return await this.issueTypeService.updateIssueType(
      req.headers.projectId,
      issueTypeId,
      data,
    );
  }

  @MemberPermission()
  @Post()
  async createIssueType(
    @Request() req: any,
    @Body(new AJVValidationPipe(CreateIssueTypeSchema))
    data: CreateIssueTypeDto,
  ) {
    return await this.issueTypeService.createIssueType(
      req.headers.projectId,
      data,
    );
  }
}
