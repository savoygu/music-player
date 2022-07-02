import { selectCurrentSong, selectPlayerReducer } from '@/store/selectors'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ProgressBar from '@/components/progress-bar/progress-bar.component'
import {
  setCurrentTime,
  setPlaying,
  setProgressChanging,
  setVolume
} from '@/store/slices/player'
import { formatTime } from '@/utils'
import emitter from '@/utils/emitter'
import useMode from './useMode'
import useCd from './useCd'

import './player.styles.scss'

interface PlayerProps { }

const Player: FC<PlayerProps> = () => {
  // selectors
  const currentSong = useSelector(selectCurrentSong)
  const { playing, currentTime, volume } = useSelector(selectPlayerReducer)

  // dispatch
  const dispatch = useDispatch()
  const _setProgressChanging = (progressChanging: boolean) =>
    dispatch(setProgressChanging(progressChanging))
  const _setCurrentTime = (currentTime: number) =>
    dispatch(setCurrentTime(currentTime))
  const _setPlaying = (playing: boolean) => dispatch(setPlaying(playing))
  const _setVolume = (volume: number) => dispatch(setVolume(volume))

  // state
  const [playIcon, setPlayIcon] = useState('')
  const [progress, setProgress] = useState(0)

  // handlers
  const prev = () => emitter.emit('prev')
  const next = () => emitter.emit('next')
  const onProgressChanging = (progress: number) => {
    _setProgressChanging(true)
    _setCurrentTime(currentSong.duration! * progress)
  }
  const onProgressChanged = (progress: number) => {
    _setProgressChanging(false)
    if (currentSong.duration) {
      const currentTime = currentSong.duration * progress
      _setCurrentTime(currentTime)
      // 更新 audio 当前播放时间
      emitter.emit('changeTime', currentTime)
    }
    if (!playing) {
      _setPlaying(true)
    }
  }
  const onVolumeChange = (volume: number) => {
    _setVolume(volume)
    // 更新 audio 音量
    emitter.emit('changeVolume', volume)
  }
  const togglePlay = () => {
    _setPlaying(!playing)
  }

  // hooks
  const { modeIcon, changeMode } = useMode()
  const { cdRef, cdCoverRef, cdClass } = useCd()

  useEffect(() => {
    setPlayIcon(playing ? 'icon-pause' : 'icon-play')
  }, [playing])

  useEffect(() => {
    const duration = currentSong?.duration ?? 0
    setProgress(currentTime / duration)
  }, [currentSong, currentTime])

  return (
    <div className="mt-8 sm:mt-28">
      <h1 className="player-title">
        <Link to="/musics">我的私人音乐坊 &gt;</Link>
      </h1>
      <div className="flex items-center mt-6 flex-col-reverse sm:flex-row">
        <div className="flex-1 w-full">
          <div className="flex items-center h-9 mt-6 justify-center sm:mt-0 sm:justify-start">
            <span className="text-xl text-gray-800 text">
              {currentSong?.title}
            </span>
            <span className="text-sm text-gray-600 ml-1">
              <i className="mx-1.5.5.5.5.5">-</i> {currentSong?.artist}
            </span>
          </div>
          <div className="flex items-center mt-8">
            <span className="player-music-time mr-1.5">{formatTime(currentTime)}</span>
            <div className="flex-1">
              <ProgressBar
                progress={progress}
                onProgressChanging={onProgressChanging}
                onProgressChanged={onProgressChanged}
              />
            </div>
            <span className="player-music-time ml-1.5">
              {formatTime(currentSong?.duration)}
            </span>
          </div>
          <div className="flex justify-between mt-10">
            <i
              className={`icon cursor-pointer ${modeIcon}`}
              onClick={changeMode}
            />
            <span>
              <i className="icon icon-prev cursor-pointer" onClick={prev} />
              <i
                className={`icon cursor-pointer ml-5 ${playIcon}`}
                onClick={togglePlay}
              />
              <i
                className="icon icon-next cursor-pointer ml-5"
                onClick={next}
              />
            </span>
            <div className="inline-flex items-center ">
              <i className="icon icon-volume" />
              <div className="w-16 ml-1.5">
                <ProgressBar
                  progress={volume}
                  onProgressChanging={onVolumeChange}
                  onProgressChanged={onVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[180px] h-[180px] sm:ml-5">
          {currentSong && (
            <div ref={cdRef}>
              <img
                ref={cdCoverRef}
                className={`w-full h-full rounded-full ${cdClass}`}
                src={currentSong.cover}
                alt={currentSong.title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Player
