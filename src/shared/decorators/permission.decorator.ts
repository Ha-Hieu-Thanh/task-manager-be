import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from '@shared/guards/access-token.guard';
import { RolesGuard } from '@shared/guards/roles.guard';

import { Roles } from './guard.decorator';
import { EGuardDecoratorKey, UserType } from '@constants/constant';
import { ProjectMemberGuard } from '@shared/guards/project.guard';
import { ProjectManagerGuard } from '@shared/guards/pm.guard';

export const Public = () => SetMetadata(EGuardDecoratorKey.PUBLIC, true);

export const UserPermission = () =>
  applyDecorators(UseGuards(AccessTokenGuard));

export const MemberPermission = () =>
  applyDecorators(UseGuards(AccessTokenGuard, ProjectMemberGuard));

export const ManagerPermission = () =>
  applyDecorators(UseGuards(AccessTokenGuard, ProjectManagerGuard));

export const AdminPermission = () =>
  applyDecorators(
    Roles(UserType.ADMIN),
    UseGuards(AccessTokenGuard, RolesGuard),
  );
