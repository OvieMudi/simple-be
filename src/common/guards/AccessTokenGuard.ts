import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthStrategies } from 'src/auth/enums';

@Injectable()
export class AccessTokenGuard extends AuthGuard(AuthStrategies.JWT) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride('isPublicRoute', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublicRoute) return true;

    return super.canActivate(ctx);
  }
}
