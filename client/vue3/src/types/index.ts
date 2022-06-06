import { PLAY_MODE, STORAGE } from '@/constant'

export interface MusicItem {
  title: string
  artist: string
  url: string
  cover: string
  duration?: number
}

export type PlayMode = typeof PLAY_MODE[keyof typeof PLAY_MODE]
export type Storage = typeof STORAGE[keyof typeof STORAGE]
