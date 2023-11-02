import { Controller } from '@nestjs/common';
import { IssueTypeService } from './service';

@Controller('issue-type')
export class IssueTypeController {
  constructor(private readonly issueTypeService: IssueTypeService) {}
}
