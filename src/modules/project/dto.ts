import { RoleType } from '@constants/constant';

export class CreateProjectDto {
  name: string;
  key: string;
  description?: string;
}

export class UpdateProjectDto {
  id: string;
  name?: string;
  key?: string;
  description?: string;
}
