import { join } from 'path';
import { Duplex } from 'stream';
import { Config, Init, Inject, Provide } from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import * as qiniu from 'qiniu';
import { makeHttpRequest } from '@midwayjs/core';

export const bufferToStream = buffer => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export const streamToBuffer = stream => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('error', reject);
    stream.on('data', data => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
};

@Provide()
export class QiniuService {
  @Config('qiniu')
  qiniuConfig;

  @Inject()
  cacheManager: CacheManager;

  // qiniu
  mac;
  config;
  putPolicy;
  bucketManager;
  cdnManager;

  @Init()
  initConfig() {
    const mac = (this.mac = new qiniu.auth.digest.Mac(
      this.qiniuConfig.accessKey,
      this.qiniuConfig.secretKey
    ));
    const config = (this.config = new qiniu.conf.Config({
      zone: qiniu.zone.Zone_z2,
    }));
    this.putPolicy = new qiniu.rs.PutPolicy({
      scope: this.qiniuConfig.bucket, //  + ':' + 'default.json',
    });
    this.bucketManager = new qiniu.rs.BucketManager(mac, config);
    this.cdnManager = new qiniu.cdn.CdnManager(mac);
  }

  // 获取文件内容
  async getJSONFile(key) {
    const downloadUrl = await this.publicDownloadUrl(key);
    // 请求文件
    const resp = await makeHttpRequest(downloadUrl, {
      dataType: 'json',
    });

    // 文件不存在
    if (resp.status === 404) {
      await this.uploadBytes(key, '[]');
      return [];
    }

    return resp.data;
  }

  async checkFileExists(key) {
    const downloadUrl = await this.publicDownloadUrl(key);
    // 请求文件
    const resp = await makeHttpRequest(downloadUrl);
    return {
      exists: resp.status !== 404,
      resp,
      downloadUrl,
    };
  }

  async publicDownloadUrl(key) {
    const publicDownloadUrl = this.bucketManager.publicDownloadUrl(
      this.qiniuConfig.bucketDomain,
      key
    );
    return publicDownloadUrl;
  }

  // 获取私有空间访问链接
  async privateDownloadUrl(key) {
    // let privateDownloadUrl: string = await this.cacheManager.get(key);
    // if (privateDownloadUrl) return privateDownloadUrl;

    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const privateDownloadUrl = this.bucketManager.privateDownloadUrl(
      this.qiniuConfig.bucketDomain,
      key,
      deadline
    );
    // await this.cacheManager.set(key, privateDownloadUrl, { ttl: 3480 });
    return privateDownloadUrl;
  }

  // 删除文件
  async deleteFile(filename) {
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(
        this.qiniuConfig.bucket,
        filename,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          } else {
            resolve(respBody);
          }
        }
      );
    });
  }

  // 刷新文件
  async refreshUrls(urls) {
    const urlsToRefresh = await Promise.all(
      urls.map(url => this.publicDownloadUrl(url))
    );
    return new Promise((resolve, reject) => {
      this.cdnManager.refreshUrls(urlsToRefresh, (err, respBody, respInfo) => {
        if (err) {
          reject(err);
        } else {
          resolve(respBody);
        }
      });
    });
  }

  // 上传流
  async uploadStream(filename, stream) {
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();
    const uploadToken = await this.uploadToken();

    return new Promise<{ hash: string; key: string }>((resolve, reject) => {
      formUploader.putStream(
        uploadToken,
        filename,
        stream,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          } else {
            resolve(respBody);
          }
        }
      );
    });
  }

  // 上传文件
  async uploadFile(
    filename,
    file: string = join(__dirname, '../qiniu.default.txt')
  ) {
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();
    const uploadToken = await this.uploadToken();

    return new Promise((resolve, reject) => {
      formUploader.putFile(
        uploadToken,
        filename,
        file,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          } else if (respInfo.statusCode === 200) {
            resolve(respBody);
          } else {
            reject(new Error(respInfo.data.error));
          }
        }
      );
    });
  }

  // 上传字节
  async uploadBytes(filename, content) {
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();
    const uploadToken = await this.uploadToken();

    return new Promise((resolve, reject) => {
      formUploader.put(
        uploadToken,
        filename,
        content,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          } else if (respInfo.statusCode === 200) {
            resolve(respBody);
          } else {
            reject(new Error(respInfo.data.error));
          }
        }
      );
    });
  }

  // 上传链接
  async uploadLink(key, link) {
    // eslint-disable-next-line prefer-const
    let { exists, downloadUrl } = await this.checkFileExists(key);
    if (!exists) {
      const buffer = await makeHttpRequest(link);
      const respBody = await this.uploadStream(
        key,
        bufferToStream(buffer.data)
      );
      downloadUrl = this.qiniuConfig.bucketDomain + '/' + respBody.key;
    }
    return {
      downloadUrl,
    };
  }

  async uploadToken() {
    let token: string = await this.cacheManager.get('token');
    if (token) return token;

    token = this.putPolicy.uploadToken(this.mac);
    await this.cacheManager.set('token', token, { ttl: 3480 });
    return token;
  }
}
