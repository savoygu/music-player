// import { combineReducers } from '@reduxjs/toolkit'

import musicsReducer from '@/store/slices/musics'
import playerReducer from '@/store/slices/player'
import themeReducer from '@/store/slices/theme'
// import { BaseRootState } from '@/types'

// const rootReducer = combineReducers<BaseRootState>({
//   playerState: playerReducer,
//   musicsState: musicsReducer,
//   themeState: themeReducer
// })

export { playerReducer, musicsReducer, themeReducer }

// export default rootReducer
