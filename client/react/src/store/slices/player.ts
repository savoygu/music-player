import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import musicList from '@/store/musiclist.json'
import { MusicItem, PlayerState } from '@/types'
import { shuffle } from '@/utils'
import { PLAY_MODE } from '@/utils/enums'

export const initialState: PlayerState = {
  sequenceList: musicList,
  playList: musicList,
  playing: false,
  playMode: PLAY_MODE.SEQUENCE,
  currentIndex: 0,
  currentTime: 0,
  volume: 1,
  progressChanging: false // 进度条拖拽中，阻止 timeupdate 事件修改 currentTime
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlaying: (state, { payload }: PayloadAction<boolean>) => {
      state.playing = payload
    },
    setSequenceList: (state, { payload }: PayloadAction<MusicItem[]>) => {
      state.sequenceList = payload
    },
    setPlayList(state, { payload }: PayloadAction<MusicItem[]>) {
      state.playList = payload
    },
    setPlayMode(state, { payload }: PayloadAction<PLAY_MODE>) {
      state.playMode = payload
    },
    setCurrentIndex(state, { payload }: PayloadAction<number>) {
      state.currentIndex = payload
    },
    setCurrentTime(state, { payload }: PayloadAction<number>) {
      state.currentTime = payload
    },
    setVolume(state, { payload }: PayloadAction<number>) {
      state.volume = payload
    },
    setProgressChanging(state, { payload }: PayloadAction<boolean>) {
      state.progressChanging = payload
    },

    selectPlay(
      state,
      {
        payload
      }: PayloadAction<Pick<PlayerState, 'sequenceList' | 'currentIndex'>>
    ) {
      state.sequenceList = payload.sequenceList
      state.playList = payload.sequenceList
      state.playing = true
      state.playMode = PLAY_MODE.SEQUENCE
      state.currentIndex = payload.currentIndex
    },
    randomPlay(
      state,
      { payload }: PayloadAction<Pick<PlayerState, 'sequenceList'>>
    ) {
      state.sequenceList = payload.sequenceList
      state.playList = shuffle<MusicItem>(payload.sequenceList)
      state.playing = true
      state.playMode = PLAY_MODE.RANDOM
      state.currentIndex = 0
    },
    changeMode(state, { payload }: PayloadAction<PLAY_MODE>) {
      const { title, artist } = state.playList[state.currentIndex]
      if (payload === PLAY_MODE.RANDOM) {
        state.playList = shuffle(state.sequenceList)
      } else {
        state.playList = state.sequenceList
      }
      const currentIndex = state.playList.findIndex(
        (item) => item.title === title && item.artist === artist
      )
      state.currentIndex = currentIndex
      state.playMode = payload
    },

    setCurrentSongDuration(state, { payload }: { payload: number }) {
      state.playList[state.currentIndex].duration = payload
    }
  }
})

export const {
  setPlaying,
  setSequenceList,
  setPlayList,
  setPlayMode,
  setCurrentIndex,
  setCurrentTime,
  setVolume,
  setProgressChanging,
  selectPlay,
  randomPlay,
  changeMode,
  setCurrentSongDuration
} = playerSlice.actions

export default playerSlice.reducer
