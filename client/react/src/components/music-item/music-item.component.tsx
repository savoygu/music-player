import { FolderDownload, Delete } from '@icon-park/react'
import { FC, MouseEventHandler } from 'react'
import LazyLoad from 'react-lazyload'
import { useDispatch, useSelector } from 'react-redux'

import { useToast } from '../toast'
import './music-item.styles.scss'

import { selectCurrentSong, selectMusicsReducer } from '@/store/selectors'
import { addToLocal, removeFromLocal } from '@/store/slices/musics'
import { MusicItem as TMusicItem } from '@/types'
import { STORAGE } from '@/utils/enums'

type MusicItemProps = {
  musicItem: TMusicItem
  currentTab: STORAGE
  onClick: () => void
}

const MusicItem: FC<MusicItemProps> = ({ currentTab, musicItem, onClick }) => {
  // context
  const toast = useToast()

  // selectors
  const { localMusics } = useSelector(selectMusicsReducer)
  const currentSong = useSelector(selectCurrentSong)
  const isActive =
    musicItem.title === currentSong?.title &&
    musicItem.artist === currentSong?.artist
  const inLocal = !!localMusics.find(
    (item) => item.title === musicItem.title && item.artist === musicItem.artist
  )

  // dispatch
  const dispatch = useDispatch()
  const _addToLocal: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation()

    dispatch(addToLocal(musicItem))
    toast.open('已添加到本地')
  }
  const _removeFromLocal: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation()

    dispatch(removeFromLocal(musicItem))
    toast.open('移除成功')
  }

  return (
    <div
      className={`music-item ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      aria-hidden="true"
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
    </div>
  )
}

export default MusicItem
