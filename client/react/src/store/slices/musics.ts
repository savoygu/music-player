import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import musicList from '@/store/musiclist.json'
import { MusicItem, MusicsState } from '@/types'
import { MODE, STORAGE } from '@/utils/enums'

export const initialState: MusicsState = {
  currentTab: STORAGE.LOCALE,
  currentMode: MODE.LIST,
  onlineMusics: [],
  localMusics: musicList,
  error: '',
  loading: false
}

const musicsSlice = createSlice({
  name: 'musics',
  initialState,
  reducers: {
    setCurrentTab: (state, { payload }: PayloadAction<STORAGE>) => {
      state.currentTab = payload
    },
    setCurrentMode: (state, { payload }: PayloadAction<MODE>) => {
      state.currentMode = payload
    },
    addToLocal: (state, { payload }: PayloadAction<MusicItem>) => {
      state.localMusics.push(payload)
    },
    removeFromLocal: (state, { payload }: PayloadAction<MusicItem>) => {
      state.localMusics = state.localMusics.filter(
        (item) =>
          !(item.title === payload.title && item.artist === payload.artist)
      )
    },

    loadMusics: (state) => {
      state.loading = true
    },
    loadMusicsSuccess: (state, { payload }: PayloadAction<MusicItem[]>) => {
      state.onlineMusics = payload
      state.loading = false
    },
    loadMusicsFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.loading = false
    }
  }
})

export const {
  setCurrentTab,
  setCurrentMode,
  addToLocal,
  removeFromLocal,
  loadMusics,
  loadMusicsSuccess,
  loadMusicsFailure
} = musicsSlice.actions

export default musicsSlice.reducer
