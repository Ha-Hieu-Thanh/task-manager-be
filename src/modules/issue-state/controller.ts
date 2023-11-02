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
import { MemberPermission } from '@shared/decorators/permission.decorator';
import { IssueStateService } from './service';
import { AJVValidationPipe } from '@shared/pipes/AJVValidationPipe';
import { UpdateAccountSchema } from '@modules/account/validation';
import { UpdateAccountDto } from '@modules/account/dto';
import {
  CraeteIssueStateSchema,
  UpdateIssueStateOrderSchema,
  UpdateIssueStateOrdersSchema,
  UpdateIssueStateSchema,
} from './validation';
import {
  CreateIssueStateDto,
  UpdateIssueStateDto,
  UpdateIssueStateOrderDto,
  UpdateIssueStateOrdersDto,
} from './dto';

@Controller('issue-state')
export class IssueStateController {
  constructor(private readonly issueStateService: IssueStateService) {}
  @MemberPermission()
  @Get()
  async getIssueStates(@Request() req: any) {
    return await this.issueStateService.getIssueStates(req.headers.projectId);
  }

  @MemberPermission()
  @Delete('/:issueStateId')
  async deleteIssueStates(
    @Request() req: any,
    @Param('issueStateId') issueStateId: number,
  ) {
    return await this.issueStateService.deleteIssueStates(
      req.headers.projectId,
      issueStateId,
    );
  }

  @MemberPermission()
  @Get('/:issueStateId')
  async getIssueState(
    @Request() req: any,
    @Param('issueStateId') issueStateId: number,
  ) {
    return await this.issueStateService.getIssueState(
      req.headers.projectId,
      issueStateId,
    );
  }

  @MemberPermission()
  @Put('/:issueStateId')
  async updateIssueState(
    @Request() req: any,
    @Param('issueStateId') issueStateId: number,
    @Body(new AJVValidationPipe(UpdateIssueStateSchema))
    data: UpdateIssueStateDto,
  ) {
    return await this.issueStateService.updateIssueState(
      req.headers.projectId,
      issueStateId,
      data,
    );
  }

  @MemberPermission()
  @Put('/order')
  async updateIssueStateOrder(
    @Request() req: any,
    @Body(new AJVValidationPipe(UpdateIssueStateOrdersSchema))
    data: UpdateIssueStateOrdersDto,
  ) {
    return await this.issueStateService.updateIssueStateOrder(
      req.headers.projectId,
      data,
    );
  }

  @MemberPermission()
  @Post()
  async createIssueState(
    @Request() req: any,
    @Body(new AJVValidationPipe(CraeteIssueStateSchema))
    data: CreateIssueStateDto,
  ) {
    return await this.issueStateService.createIssueState(
      req.headers.projectId,
      data,
    );
  }
}
