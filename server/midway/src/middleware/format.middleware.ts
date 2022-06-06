import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return {
        success: true,
        message: 'OK',
        data: result,
      };
    };
  }

  match(ctx) {
    return ctx.path.indexOf('/api') !== -1;
  }

  static getName(): string {
    return 'format';
  }
}
