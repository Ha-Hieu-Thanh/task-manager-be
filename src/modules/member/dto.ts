import { RoleType } from '@constants/constant';
import { Transform } from 'class-transformer';

export class InviteMemberDto {
  email: string;
  role: RoleType;
}

export class UpdateMemberDto {
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
  memberId?: number;
  email?: string;
  name?: string;
  role?: RoleType;
  @Transform(({ value: page }) => Number(page))
  page?: number;
  @Transform(({ value: limit }) => Number(limit))
  limit?: number;
}

export class VerifyCodeDto {
  code: string;
}
