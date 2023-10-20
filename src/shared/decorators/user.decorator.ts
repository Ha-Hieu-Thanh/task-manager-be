import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '@constants/constant';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    switch (data) {
      case 'userId':
        return request.user['userId'];
      default:
        return request.user;
    }
  },
);
