import { FC, MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FolderDownload, Delete } from '@icon-park/react'
import LazyLoad from 'react-lazyload'

import { selectCurrentSong, selectMusicsReducer } from '@/store/selectors'
import { addToLocal, removeFromLocal } from '@/store/slices/musics'
import { STORAGE } from '@/utils/enums'
import { MusicItem as TMusicItem } from '@/types'

import './music-item.styles.scss'

interface MusicItemProps {
  musicItem: TMusicItem
  currentTab: STORAGE
  onClick: () => void
}

const MusicItem: FC<MusicItemProps> = ({ currentTab, musicItem, onClick }) => {
  // selectors
  const { localMusics } = useSelector(selectMusicsReducer)
  const currentSong = useSelector(selectCurrentSong)

  // dispatch
  const dispatch = useDispatch()
  const _addToLocal: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation()

    dispatch(addToLocal(musicItem))
  }
  const _removeFromLocal: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation()

    dispatch(removeFromLocal(musicItem))
  }

  // state
  const [isActive, setIsActive] = useState(false)
  const [inLocal, setInLocal] = useState(false)


  // hooks
  useEffect(() => {
    setIsActive(
      musicItem.title === currentSong?.title &&
      musicItem.artist === currentSong?.artist
    )
  }, [currentSong, musicItem])

  useEffect(() => {
    setInLocal(
      !!localMusics.find(
        (item) =>
          item.title === musicItem.title && item.artist === musicItem.artist
      )
    )
  }, [localMusics, musicItem])

  return (
    <div
      className={`music-item ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
    >
      <div className="music-item-inner">
        <LazyLoad>
          <img
            src={musicItem.cover}
            className="w-10 h-10"
            alt={musicItem.title}
          />
        </LazyLoad>
        <span className="music-title ml-2.5 text-sm text-gray-800">
          {musicItem.title}
        </span>
        <span className="music-artist mr-auto text-xs text-gray-500">
          <i className="mx-1.5">-</i>
          {musicItem.artist}
        </span>
        {STORAGE.ONLINE === currentTab && !inLocal && (
          <FolderDownload
            className="p-2"
            theme="outline"
            size="16"
            fill="#333"
            onClick={_addToLocal}
          />
        )}
        {STORAGE.LOCALE === currentTab && (
          <Delete
            className="p-2"
            theme="outline"
            size="16"
            fill="#333"
            onClick={_removeFromLocal}
          />
        )}
      </div>
    </div >
  )
}

export default MusicItem
