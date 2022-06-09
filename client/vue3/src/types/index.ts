import { PLAY_MODE, STORAGE, MODE, THEME } from '@/constant'

export interface MusicItem {
  title: string
  artist: string
  url: string
  cover: string
  duration?: number
}

export type PlayMode = typeof PLAY_MODE[keyof typeof PLAY_MODE]
export type Storage = typeof STORAGE[keyof typeof STORAGE]

export type Mode = typeof MODE[keyof typeof MODE]
export type Theme = typeof THEME[keyof typeof THEME]
