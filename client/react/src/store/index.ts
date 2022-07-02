import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootSaga from '@/store/sagas'
import { themeReducer, musicsReducer, playerReducer } from '@/store/slices'
import { PlayerState, RootState } from '@/types'

type ExtendedPersistConfig<T> = PersistConfig<T> & {
  whitelist?: (keyof T)[]
  blacklist?: (keyof T)[]
}

const rootPersistConfig: ExtendedPersistConfig<RootState> = {
  key: 'music-player',
  storage,
  blacklist: ['playerState']
}
const playerPersistConfig: ExtendedPersistConfig<PlayerState> = {
  key: 'music-player:player',
  storage,
  whitelist: ['sequenceList', 'playList', 'playMode', 'currentIndex', 'currentTime', 'volume']
}

const rootReducer = combineReducers<RootState>({
  themeState: themeReducer,
  musicsState: musicsReducer,
  playerState: persistReducer(playerPersistConfig, playerReducer)
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default store