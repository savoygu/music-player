<script setup lang="ts">
import { PLAY_MODE } from '@/constant'
import { usePlayerStore } from '@/store/player'
import { equals } from '@/utils'
import { computed, onMounted, ref, watch } from 'vue'

// reactive
const audioRef = ref(null)
const isReady = ref(false)

// store
const playerStore = usePlayerStore()
const playList = computed(() => playerStore.playList)
const playing = computed(() => playerStore.playing)
const playMode = computed(() => playerStore.playMode)
const currentSong = computed(() => playerStore.currentSong)
const currentIndex = computed(() => playerStore.currentIndex)
const currentTime = computed(() => playerStore.currentTime)
const progressChanging = computed(() => playerStore.progressChanging)
const volume = computed(() => playerStore.volume)

onMounted(() => {
  if (currentSong.value) {
    const audioEl: HTMLAudioElement = audioRef.value!
    audioEl.src = currentSong.value.url
    audioEl.currentTime = currentTime.value
    audioEl.volume = volume.value
  }
})

// watch
watch(currentSong, (newSong, oldSong) => {
  if (!newSong.url) return
  if (equals(newSong, oldSong)) return

  isReady.value = false
  const audioEl: HTMLAudioElement = audioRef.value!
  audioEl.src = newSong.url
  audioEl.play()
})
watch(playing, (newPlaying) => {
  if (!isReady.value) return

  const audioEl: HTMLAudioElement = audioRef.value!
  newPlaying ? audioEl.play() : audioEl.pause()
})

// methods
const pause = () => {
  playerStore.setPlaying(false)
}
const ready = (e: Event) => {
  if (isReady.value) return
  isReady.value = true

  if (!currentSong.value.duration) {
    playerStore.$patch(state => {
      state.playList[state.currentIndex] = {
        ...currentSong.value,
        duration: (e.target as HTMLAudioElement).duration
      }
    })
  }
  playerStore.setVolume((e.target as HTMLAudioElement).volume)
}
const loop = () => {
  const audioEl: HTMLAudioElement = audioRef.value!
  audioEl.currentTime = 0
  playerStore.setPlaying(true)
}
const prev = () => {
  const list = playList.value
  if (!isReady.value || !list.length) return

  if (list.length === 1) {
    loop()
  } else {
    let index = currentIndex.value - 1
    if (index === -1) index = list.length - 1
    playerStore.setCurrentIndex(index)
    if (!playing.value) playerStore.setPlaying(true)
  }
}
const next = () => {
  const list = playList.value
  if (!isReady.value || !list.length) return

  if (list.length === 1) {
    loop()
  } else {
    let index = currentIndex.value + 1
    if (index === list.length) index = 0
    playerStore.setCurrentIndex(index)
    if (!playing.value) playerStore.setPlaying(true)
  }
}
const error = () => {
  isReady.value = true
}
const updateTime = (e: Event) => {
  if (progressChanging.value) return

  playerStore.setCurrentTime((e.target as HTMLAudioElement).currentTime)
}
const changeTime = (currentTime: number) => {
  (audioRef.value! as HTMLAudioElement).currentTime = currentTime
}
const end = () => {
  playerStore.setCurrentTime(0)

  if (playMode.value === PLAY_MODE.LOOP) {
    loop()
  } else {
    next()
  }
}
const changeVolume = (volume: number) => {
  (audioRef.value! as HTMLAudioElement).volume = volume
}

defineExpose({
  prev,
  next,
  changeTime,
  changeVolume
})
</script>

<template>
  <audio
    ref="audioRef"
    @pause="pause"
    @canplay="ready"
    @error="error"
    @timeupdate="updateTime"
    @ended="end"
  />
</template>
