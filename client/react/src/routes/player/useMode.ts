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

  const onChangeMode = () => {
    const mode = (playMode + 1) % 3
    _changeMode(mode)
  }

  return {
    playMode,
    changeMode: onChangeMode
  }
}

export default useMode
