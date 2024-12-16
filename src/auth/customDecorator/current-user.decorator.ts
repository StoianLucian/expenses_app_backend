import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserFromRequest = createParamDecorator(
  (data: null, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user;

    return user;
  },
);
