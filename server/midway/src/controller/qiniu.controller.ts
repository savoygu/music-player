import { basename, extname } from 'path';
import { HttpStatus, MidwayHttpError } from '@midwayjs/core';
import {
  Body,
  Config,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import * as dayjs from 'dayjs';
import { MusicDTO } from '../dto/music';
import { QiniuService } from '../service/qiniu.service';
import { IMusic } from '../interface';

@Controller('/api/qiniu')
export class QiniuController {
  @Inject()
  ctx: Context;

  @Config('qiniu')
  qiniuConfig;

  @Inject()
  qiniuService: QiniuService;

  @Get('/get_musics')
  async getMusics(@Query('filename') filename: string) {
    const result = await this.qiniuService.getJSONFile(filename);
    return result;
  }

  @Post('/upload_music')
  @Validate({
    locale: 'zh_CN',
  })
  async uploadMusic(
    @Body('filename') filename: string,
    @Body('music') music: MusicDTO
  ) {
    // 获取所有音乐
    let musics = (await this.qiniuService.getJSONFile(filename)) as IMusic[];
    if (
      musics.find(
        item => item.title === music.title && item.artist === music.artist
      )
    ) {
      throw new MidwayHttpError('歌曲已存在', HttpStatus.CONFLICT);
    }

    // 上传音频和封面
    const musicExt = music.url.match(
      /\.(cda|wav|mp3|aiff?|mid|wma|ra|vqf|ape)/
    );
    const coverExt = music.cover.match(/\.(jpe?g|png|webp|bmp|gif)/);
    const musicKey = `music/${music.title}-${music.artist}.${
      musicExt ? musicExt[1] : 'mp3'
    }`;
    const coverKey = `cover/${music.title}-${music.artist}.${
      coverExt ? coverExt[1] : 'jpg'
    }`;
    const [{ downloadUrl: musicUrl }, { downloadUrl: coverUrl }] =
      await Promise.all([
        this.qiniuService.uploadLink(musicKey, music.url),
        this.qiniuService.uploadLink(coverKey, music.cover),
      ]);

    // 备份
    const ext = extname(filename);
    const newFilename = `${basename(filename, ext)}-${dayjs().format(
      'YYYYMMDDHH'
    )}${ext}`;
    await this.qiniuService.moveFile(filename, `backup/${newFilename}`);

    // 上传 filename
    const musicInfo = {
      ...music,
      url: musicUrl,
      cover: coverUrl,
    };
    if (
      musics.find(
        item => item.title === music.title && item.artist === music.artist
      )
    ) {
      musics = musics.map(item => {
        if (item.title === music.title && item.artist === music.artist) {
          return {
            ...item,
            ...musicInfo,
          };
        }
        return item;
      });
    } else {
      musics = musics.concat(musicInfo);
    }
    await this.qiniuService.uploadBytes(filename, JSON.stringify(musics));
    await this.qiniuService.refreshUrls([filename]);
    return '上传成功';
  }
}
