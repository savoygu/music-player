import { computed } from 'vue'
import { PLAY_MODE } from '@/utils/enums'
import { usePlayerStore } from '@/store/player'

export default function useModel () {
  const playerStore = usePlayerStore()
  const playMode = computed(() => playerStore.playMode)

  const modeIcon = computed(() => {
    const modeVal = playMode.value
    return modeVal === PLAY_MODE.SEQUENCE
      ? 'icon-sequence'
      : modeVal === PLAY_MODE.RANDOM
        ? 'icon-random'
        : 'icon-loop'
  })

  const currentMode = computed(() => {
    const modeVal = playMode.value
    return modeVal === PLAY_MODE.SEQUENCE
      ? 'play-cycle'
      : modeVal === PLAY_MODE.RANDOM
        ? 'shuffle-one'
        : 'play-once'
  })

  const changeMode = () => {
    const mode = (playMode.value + 1) % 3
    playerStore.changeMode(mode)
  }

  return {
    modeIcon,
    currentMode,
    changeMode
  }
}
