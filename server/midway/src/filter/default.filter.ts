import { MidwayHttpError } from '@midwayjs/core';
import { Catch } from '@midwayjs/decorator';

@Catch()
export class DefaultErrorFilter {
  async catch(err: MidwayHttpError) {
    // 所有的未分类错误会到这里
    return {
      success: false,
      status: err.status ?? 500,
      message: err.message,
    };
  }
}
