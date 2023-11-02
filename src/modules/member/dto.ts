import { RoleType } from '@constants/constant';
import { Transform } from 'class-transformer';

export class InviteMemberDto {
  projectId: number;
  email: string;
  role: RoleType;
}

export class UpdateMemberDto {
  projectId: number;
  memberId: number;
  role: RoleType;
}

export class InviteMembersDto {
  members: InviteMemberDto[];
}

export class UpdateMembersDto {
  members: UpdateMemberDto[];
}

export class GetMembersQueryDto {
  projectId?: number;
  memberId?: number;
  email?: string;
  name?: string;
  role?: RoleType;
  @Transform(({ value: page }) => Number(page))
  page?: number;
  @Transform(({ value: limit }) => Number(limit))
  limit?: number;
}
