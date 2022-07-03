import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'
import { ViewGridCard, ViewGridList } from '@icon-park/react'

import MusicItem from '@/components/music-item/music-item.component'
import { selectMusicList, selectMusicsReducer } from '@/store/selectors'
import {
  loadMusics,
  setCurrentMode,
  setCurrentTab
} from '@/store/slices/musics'
import { selectPlay } from '@/store/slices/player'
import { MODE, STORAGE } from '@/utils/enums'

import './musics.styles.scss'

const MusicList = () => {
  // selectors
  const { currentTab, currentMode, onlineMusics, localMusics } =
    useSelector(selectMusicsReducer)
  const currentMusicList = useSelector(selectMusicList)

  // dispatch
  const dispatch = useDispatch()
  const _setCurrentMode = (mode: MODE) => dispatch(setCurrentMode(mode))

  // state
  const [tab, setTab] = useState(currentTab)
  const [musicList, setMusicList] = useState(currentMusicList)

  // handlers
  const selectItem = (index: number) => {
    dispatch(setCurrentTab(tab))
    dispatch(
      selectPlay({
        sequenceList: musicList,
        currentIndex: index
      })
    )
  }

  // hooks
  useEffectOnce(() => {
    dispatch(loadMusics())
  })

  useEffect(() => {
    setMusicList(tab === STORAGE.ONLINE ? onlineMusics : localMusics)
  }, [tab, onlineMusics, localMusics])

  return (
    <div className="musics my-8">
      <div className="music-header mb-5">
        <div className="music-tabs">
          <span
            className={tab === STORAGE.LOCALE ? 'is-active' : ''}
            onClick={() => setTab(STORAGE.LOCALE)}
          >
            本地
          </span>
          <span
            className={`ml-2.5 ${tab === STORAGE.ONLINE ? 'is-active' : ''}`}
            onClick={() => setTab(STORAGE.ONLINE)}
          >
            在线
          </span>
        </div>
        <span className="music-mode">
          {currentMode === MODE.CARD && (
            <ViewGridCard
              theme="outline"
              size="24"
              fill="#6b7280"
              onClick={() => _setCurrentMode(MODE.LIST)}
            />
          )}
          {currentMode === MODE.LIST && (
            <ViewGridList
              theme="outline"
              size="24"
              fill="#6b7280"
              onClick={() => _setCurrentMode(MODE.CARD)}
            />
          )}
        </span>
      </div>

      <div className={`music-list ${currentMode === MODE.CARD && 'mode-card'}`}>
        {musicList.map((item, index) => (
          <MusicItem
            key={item.title + item.artist}
            musicItem={item}
            currentTab={tab}
            onClick={() => selectItem(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default MusicList
