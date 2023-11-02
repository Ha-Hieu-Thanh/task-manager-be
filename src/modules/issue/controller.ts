import { Body, Controller, Delete, Post, Put } from '@nestjs/common';

@Controller('issue')
export class IssueController {
  @Post()
  async createIssue(@Body() data: any) {}

  @Put()
  async updateIssue(@Body() data: any) {}

  @Delete()
  async deleteIssue(@Body() data: any) {}
}
