import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as cache from '@midwayjs/cache';
import * as i18n from '@midwayjs/i18n';
import * as crossDomain from '@midwayjs/cross-domain';
import { IMidwayContainer } from '@midwayjs/core';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import { FormatMiddleware } from './middleware/format.middleware';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ValidateErrorFilter } from './filter/validate.filter';

import * as dotenv from 'dotenv';

dotenv.config();

@Configuration({
  imports: [
    koa,
    validate,
    cache,
    i18n,
    crossDomain,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady(applicationContext: IMidwayContainer) {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, FormatMiddleware]);
    // add filter
    this.app.useFilter([
      NotFoundFilter,
      ValidateErrorFilter,
      DefaultErrorFilter,
    ]);
    // add global object, you can use @Inject('lodash') in anywhere
    // applicationContext.registerObject('lodash', lodash)
  }
}
