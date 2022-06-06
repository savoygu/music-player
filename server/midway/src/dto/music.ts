import { Rule, RuleType } from '@midwayjs/validate';

const requiredString = RuleType.string().required();

export class MusicDTO {
  @Rule(requiredString)
  title: string; // 歌曲名

  @Rule(requiredString)
  artist: string; // 歌手

  // 正则验证
  @Rule(requiredString)
  url: string; // 音频地址

  // 正则验证
  @Rule(requiredString)
  cover: string; // 封面地址
}
