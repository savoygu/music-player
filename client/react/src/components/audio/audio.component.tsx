import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactEventHandler,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce, useUpdateEffect } from 'react-use'

import {
  selectCurrentSong,
  selectPlayerReducer,
  selectPlayList
} from '@/store/selectors'
import {
  setCurrentIndex,
  setCurrentSongDuration,
  setCurrentTime,
  setPlaying,
  setVolume
} from '@/store/slices/player'
import { PLAY_MODE } from '@/utils/enums'

import './audio.styles.scss'

interface AudioProps {}

export type AudioRef = {
  prev: () => void
  next: () => void
  changeTime: (currentTime: number) => void
  changeVolume: (volume: number) => void
}

const Audio: ForwardRefRenderFunction<AudioRef, AudioProps> = (
  props,
  forwardedRef
) => {
  // selectors
  const {
    playing,
    playMode,
    currentIndex,
    currentTime,
    progressChanging,
    volume
  } = useSelector(selectPlayerReducer)
  const playList = useSelector(selectPlayList)
  const currentSong = useSelector(selectCurrentSong)

  // dispatch
  const dispatch = useDispatch()
  const _setPlaying = (playing: boolean) => dispatch(setPlaying(playing))
  const _setCurrentSongDuration = (duration: number) =>
    dispatch(setCurrentSongDuration(duration))
  const _setVolume = (volume: number) => dispatch(setVolume(volume))
  const _setCurrentIndex = (index: number) => dispatch(setCurrentIndex(index))
  const _setCurrentTime = (currentTime: number) =>
    dispatch(setCurrentTime(currentTime))

  // state
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isReady, setIsReady] = useState(false)

  // handlers
  const pause = () => {
    if (!playing) return

    _setPlaying(false)
  }

  const ready: ReactEventHandler<HTMLAudioElement> = (e) => {
    if (isReady) return
    setIsReady(true)

    const audioEl = e.target as HTMLAudioElement
    if (!currentSong.duration) {
      _setCurrentSongDuration(audioEl.duration)
    }
    _setVolume(audioEl.volume)
  }

  const loop = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0

    _setPlaying(true)
  }

  const prev = () => {
    const list = playList
    if (!isReady || !list.length) return
    if (list.length === 1) {
      loop()
    } else {
      let index = currentIndex - 1
      if (index === -1) index = list.length - 1
      _setCurrentIndex(index)

      if (!playing) _setPlaying(true)
    }
  }

  const next = () => {
    const list = playList
    if (!isReady || !list.length) return
    if (list.length === 1) {
      loop()
    } else {
      let index = currentIndex + 1
      if (index === list.length) index = 0
      _setCurrentIndex(index)

      if (!playing) _setPlaying(true)
    }
  }

  const error = () => {
    setIsReady(true)
  }

  const updateTime: ReactEventHandler<HTMLAudioElement> = (e) => {
    if (progressChanging || !playing) return

    _setCurrentTime((e.target as HTMLAudioElement).currentTime)
  }

  const changeTime = (currentTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime
    }
  }

  const end = () => {
    _setCurrentTime(0)

    if (playMode === PLAY_MODE.LOOP) {
      loop()
    } else {
      next()
    }
  }

  const changeVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }

  // hooks
  useUpdateEffect(() => {
    if (!isReady) return

    const audioEl = audioRef.current!
    playing ? audioEl.play() : audioEl.pause()
  }, [playing])

  useUpdateEffect(() => {
    if (!currentSong.url) return
    setIsReady(false)

    const audioEl = audioRef.current!
    audioEl.src = currentSong.url
    audioEl.play()
  }, [currentSong.url])

  useEffectOnce(() => {
    if (currentSong) {
      const audioEl = audioRef.current!
      audioEl.src = currentSong.url
      audioEl.currentTime = currentTime
      audioEl.volume = volume
    }
  })

  useImperativeHandle(forwardedRef, () => ({
    prev,
    next,
    changeTime,
    changeVolume
  }))

  return (
    <audio
      ref={audioRef}
      onPause={pause}
      onCanPlay={ready}
      onError={error}
      onTimeUpdate={updateTime}
      onEnded={end}
    />
  )
}

export default forwardRef(Audio)
