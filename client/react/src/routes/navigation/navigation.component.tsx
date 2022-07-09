import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'

import Switch from '@/components/switch/switch.component'
import Audio, { AudioRef } from '@/components/audio/audio.component'
import Footer from '@/components/footer/footer.component'
import {
  selectCurrentSong,
  selectMusicsReducer,
  selectPlayerReducer,
  selectPlayList,
  selectTheme
} from '@/store/selectors'
import { setTheme } from '@/store/slices/theme'
import { STORAGE, THEME } from '@/utils/enums'
import emitter from '@/utils/emitter'
import Logo from '@/assets/logo.png'

import './navigation.styles.scss'

const Navigation = () => {
  // selectors
  const { currentTab } = useSelector(selectMusicsReducer)
  const { currentIndex } = useSelector(selectPlayerReducer)
  const currentSong = useSelector(selectCurrentSong)
  const playList = useSelector(selectPlayList)
  const currentTheme = useSelector(selectTheme)

  // dispatch
  const dispatch = useDispatch()

  // refs
  const audioRef = useRef<AudioRef>(null)

  // state
  const [isGreen, setIsGreen] = useState(THEME.GREEN === currentTheme)

  // handlers
  const handleThemeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsGreen(event.target.checked)
  }

  // hooks
  useEffectOnce(() => {
    const onPlay = () => audioRef.current?.prev()
    const onNext = () => audioRef.current?.next()
    const onChangeTime = (currentTime: number) =>
      audioRef.current?.changeTime(currentTime)
    const onChangeVolume = (volume: number) =>
      audioRef.current?.changeVolume(volume)

    emitter.on('prev', onPlay)
    emitter.on('next', onNext)
    emitter.on('changeTime', onChangeTime)
    emitter.on('changeVolume', onChangeVolume)
    return () => {
      emitter.off('prev', onPlay)
      emitter.off('next', onPlay)
      emitter.off('changeTime', onChangeTime)
      emitter.off('changeVolume', onChangeTime)
    }
  })

  useEffect(() => {
    const newTheme = isGreen ? THEME.GREEN : THEME.ORANGE
    dispatch(setTheme(newTheme))
  }, [isGreen, dispatch])

  return (
    <>
      <div className="navigation">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" width="32" />
          <h1 className="text-lg ml-2">Music Player</h1>
        </Link>
        {currentSong && (
          <span className="ml-auto mr-1 text-sm">
            {STORAGE.ONLINE === currentTab ? '在线' : '本地'}模式[
            {currentIndex + 1} / {playList.length}]
          </span>
        )}
        <Switch
          checked={isGreen}
          onLeverBgColor="#2f9842"
          onTextColor="#2f9842"
          onText="绿"
          offLeverBgColor="#ea6248"
          offTextColor="#ea6248"
          offText="橙"
          onChange={handleThemeChange}
        />
      </div>
      <div className="relative w-full min-h-full px-4 pt-[60px] pb-10 sm:w-[800px] sm:m-auto">
        <Outlet />
        <Footer />
      </div>
      <Audio ref={audioRef} />
    </>
  )
}

export default Navigation
