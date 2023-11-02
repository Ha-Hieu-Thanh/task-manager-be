import { SetMetadata } from '@nestjs/common';

import { EGuardDecoratorKey, RoleType, UserType } from '@constants/constant';

export const Roles = (...roles: UserType[]) =>
  SetMetadata(EGuardDecoratorKey.ROLES, roles);
