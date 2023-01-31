import Role from '../users/models/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      // return user.roles.includes(role);
      return user.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};
