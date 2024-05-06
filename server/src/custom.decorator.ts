import { ExecutionContext, SetMetadata, applyDecorators, createParamDecorator } from '@nestjs/common';

type userKey = keyof JwtUserData;

export const RequireLogin = () => SetMetadata('logined', true);

export const RequirePermission = (permission: string[]) => SetMetadata('permission', permission);

export const RequireLgPe = (permission: string[]) => {
  return applyDecorators(RequireLogin(), RequirePermission(permission));
};

export const UserInfo = createParamDecorator((data: null | userKey, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.user) {
    return null;
  }
  return data ? request.user[data] : request.user;
});
