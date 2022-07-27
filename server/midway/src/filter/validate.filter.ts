import { Catch } from '@midwayjs/decorator';
import { MidwayValidationError } from '@midwayjs/validate';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(err: MidwayValidationError) {
    // ...
    return {
      success: false,
      status: 422,
      message: '校验参数错误,' + err.message,
    };
  }
}
