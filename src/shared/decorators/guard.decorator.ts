import { SetMetadata } from '@nestjs/common';

import { EGuardDecoratorKey, UserType } from '@constants/constant';

export const Roles = (...roles: UserType[]) =>
  SetMetadata(EGuardDecoratorKey.ROLES, roles);
