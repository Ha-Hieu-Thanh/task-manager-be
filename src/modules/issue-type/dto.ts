export class UpdateIssueTypeDto {
  name?: string;
  key?: string;
  description?: string;
}

export class CreateIssueTypeDto {
  name: string;
  key: string;
  description?: string;
}
