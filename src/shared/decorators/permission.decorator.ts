import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from '@shared/guards/access-token.guard';
import { RolesGuard } from '@shared/guards/roles.guard';

import { Roles } from './guard.decorator';
import { EGuardDecoratorKey, UserType } from '@constants/constant';

export const Public = () => SetMetadata(EGuardDecoratorKey.PUBLIC, true);

export const UserPermission = () =>
  applyDecorators(UseGuards(AccessTokenGuard));

export const MemberPermission = () =>
  applyDecorators(
    Roles(UserType.MEMBER),
    UseGuards(AccessTokenGuard, RolesGuard),
  );

export const AdminPermission = () =>
  applyDecorators(
    Roles(UserType.ADMIN),
    UseGuards(AccessTokenGuard, RolesGuard),
  );
