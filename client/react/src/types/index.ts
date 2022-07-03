import { PersistState } from 'redux-persist'
import { MODE, PLAY_MODE, STORAGE, THEME } from '@/utils/enums'

export type PlayerState = {
  sequenceList: MusicItem[]
  playList: MusicItem[]
  playing: boolean
  playMode: PLAY_MODE
  currentIndex: number
  currentTime: number
  volume: number
  progressChanging: boolean
}

export type MusicsState = {
  currentTab: STORAGE
  currentMode: MODE
  onlineMusics: MusicItem[]
  localMusics: MusicItem[]
  error: string
  loading: boolean
}

export type ThemeState = {
  theme: THEME
}

export type PlayerStateWithPersist = {
  playerState: PlayerState
  _persist: PersistState
}

type PersistPartial = {
  _persist: PersistState
}

export type BaseRootState = {
  musicsState: MusicsState
  themeState: ThemeState
  playerState: PlayerState
}

export type RootState = {
  musicsState: MusicsState
  themeState: ThemeState
  playerState: PlayerState & PersistPartial
}

export interface MusicItem {
  title: string
  artist: string
  url: string
  cover: string
  duration?: number
}

export type Response = {
  success: boolean
  data: MusicItem[]
}
