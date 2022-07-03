import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setTheme as updateTheme } from '@/themes'
import { THEME } from '@/utils/enums'
import { ThemeState } from '@/types'

export const initialState: ThemeState = {
  theme: THEME.GREEN
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<THEME>) {
      state.theme = payload
      updateTheme(payload)
    }
  }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
