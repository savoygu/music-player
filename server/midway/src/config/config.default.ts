import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1654256043371_6326',
  koa: {
    port: process.env.PORT || 7001,
  },
  i18n: {
    defaultLocale: 'zh_CN',
  },
  qiniu: {
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
    bucket: process.env.BUCKET,
    bucketDomain: process.env.BUCKET_DOMAIN,
  },
} as MidwayConfig;
