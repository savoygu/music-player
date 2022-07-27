import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@/types'
import { STORAGE } from '@/utils/enums'

export const selectPlayerReducer = (state: RootState) => state.playerState
export const selectCurrentSong = createSelector(
  selectPlayerReducer,
  (playerSlice) => playerSlice.playList[playerSlice.currentIndex]
)
export const selectPlayList = createSelector(
  selectPlayerReducer,
  (playerSlice) => playerSlice.playList
)

export const selectMusicsReducer = (state: RootState) => state.musicsState
export const selectMusicList = createSelector(
  selectMusicsReducer,
  (musicsSlice) =>
    musicsSlice.currentTab === STORAGE.ONLINE
      ? musicsSlice.onlineMusics
      : musicsSlice.localMusics
)

export const selectThemeReducer = (state: RootState) => state.themeState
export const selectTheme = createSelector(
  selectThemeReducer,
  (themeSlice) => themeSlice.theme
)
