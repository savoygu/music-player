import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectPlayerReducer } from '@/store/selectors'
import { changeMode } from '@/store/slices/player'
import { PLAY_MODE } from '@/utils/enums'

const useMode = () => {
  // selectors
  const { playMode } = useSelector(selectPlayerReducer)

  // dispatch
  const dispatch = useDispatch()
  const _changeMode = (mode: PLAY_MODE) => dispatch(changeMode(mode))

  // state
  const [currentMode, setCurrentMode] = useState('')
  const [modeIcon, setModeIcon] = useState('')

  // hooks
  useEffect(() => {
    const modeVal =
      playMode === PLAY_MODE.SEQUENCE
        ? 'play-cycle'
        : playMode === PLAY_MODE.RANDOM
        ? 'shuffle-one'
        : 'play-once'

    const iconVal =
      playMode === PLAY_MODE.SEQUENCE
        ? 'icon-sequence'
        : playMode === PLAY_MODE.RANDOM
        ? 'icon-random'
        : 'icon-loop'
    setCurrentMode(modeVal)
    setModeIcon(iconVal)
  }, [playMode])

  const onChangeMode = () => {
    const mode = (playMode + 1) % 3
    _changeMode(mode)
  }

  return {
    modeIcon,
    currentMode,
    changeMode: onChangeMode
  }
}

export default useMode
