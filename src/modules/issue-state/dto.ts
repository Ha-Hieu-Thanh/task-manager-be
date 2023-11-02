export class UpdateIssueStateDto {
  name?: string;
  key?: string;
  description?: string;
}

export class UpdateIssueStateOrderDto {
  order: number;
  issueStateId: number;
}

export class UpdateIssueStateOrdersDto {
  orders: UpdateIssueStateOrderDto[];
}
