import { usePlayerStore } from '@/store/player'
import { computed, ref, watch } from 'vue'

export default function useCd () {
  const cdRef = ref<HTMLDivElement | null>(null)
  const cdCoverRef = ref<HTMLImageElement | null>(null)

  const playerStore = usePlayerStore()
  const playing = computed(() => playerStore.playing)
  const cdClass = computed(() => playing.value ? 'playing' : '')

  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value!, cdCoverRef.value!)
    }
  })

  function syncTransform (wrapper: HTMLDivElement, inner: HTMLImageElement) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform = wrapperTransform === 'none'
      ? innerTransform
      : innerTransform.concat(wrapperTransform) // 旋转角度叠加
  }

  return {
    cdRef,
    cdCoverRef,
    cdClass
  }
}
