export class UpdateIssueCategoryDto {
  name?: string;
  key?: string;
  description?: string;
}

export class CreateIssueCategoryDto {
  name: string;
  key: string;
  description?: string;
}
