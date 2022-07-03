<script setup lang="ts">
import { computed } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { usePlayerStore } from '@/store/player'
import { formatTime } from '@/utils'
import useCd from './useCd'
import useModel from './useMode'

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'player:prev'): void,
  (e: 'player:next'): void,
  (e: 'player:timechange', currentTime: number): void
  (e: 'player:volumechange', volume: number): void
}>()

// store
const playerStore = usePlayerStore()
const playing = computed(() => playerStore.playing)
const currentSong = computed(() => playerStore.currentSong)
const currentTime = computed(() => playerStore.currentTime)
const volume = computed(() => playerStore.volume)

// hooks
const { modeIcon, changeMode } = useModel()
const { cdRef, cdCoverRef, cdClass } = useCd()

// computed
const playIcon = computed(() => {
  return playing.value ? 'icon-pause' : 'icon-play'
})
const progress = computed(() => {
  const duration = currentSong.value?.duration ?? 0
  return currentTime.value / duration
})

// methods
const togglePlay = () => {
  playerStore.setPlaying(!playing.value)
}

const prev = () => emit('player:prev')
const next = () => emit('player:next')

const onProgressChanging = (progress: number) => {
  playerStore.setProgressChanging(true)
  playerStore.setCurrentTime(currentSong.value.duration! * progress)
}
const onProgressChanged = (progress: number) => {
  playerStore.setProgressChanging(false)

  const currentTime = currentSong.value.duration! * progress
  playerStore.setCurrentTime(currentTime)
  emit('player:timechange', currentTime)

  if (!playing.value) { playerStore.setPlaying(true) }
}

const onVolumeChange = (volume: number) => {
  playerStore.setVolume(volume)
  emit('player:volumechange', volume)
}

</script>

<template>
  <div class="mt-8 sm:mt-28">
    <h1 class="player-title">
      <router-link to="/musics">
        我的私人音乐坊 &gt;
      </router-link>
    </h1>
    <div
      class="flex items-center mt-6 flex-col-reverse sm:flex-row"
    >
      <div class="flex-1 w-full">
        <div class="flex items-center h-9 mt-6 justify-center sm:mt-0 sm:justify-start">
          <span class="text-xl text-gray-800 text">
            {{ currentSong?.title }}
          </span>
          <span class="text-sm text-gray-600 ml-1">
            <i class="mx-1.5.5.5.5.5">-</i> {{ currentSong?.artist }}
          </span>
        </div>
        <div class="flex items-center mt-8">
          <span class="music-time mr-1.5">
            {{ formatTime(currentTime) }}
          </span>
          <ProgressBar
            class="flex-1"
            :progress="progress"
            @progress-changing="onProgressChanging"
            @progress-changed="onProgressChanged"
          />
          <span class="music-time ml-1.5">
            {{ formatTime(currentSong?.duration) }}
          </span>
        </div>
        <div class="flex justify-between mt-10">
          <i
            class="icon cursor-pointer"
            :class="modeIcon"
            @click="changeMode"
          />
          <span>
            <i
              class="icon icon-prev cursor-pointer"
              @click="prev"
            />
            <i
              class="icon cursor-pointer ml-5"
              :class="playIcon"
              @click="togglePlay"
            />
            <i
              class="icon icon-next cursor-pointer ml-5"
              @click="next"
            />
          </span>
          <div class="inline-flex items-center ">
            <i class="icon icon-volume" />
            <div class="w-16 ml-1.5">
              <ProgressBar
                :progress="volume"
                @progress-changing="onVolumeChange"
                @progress-changed="onVolumeChange"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-[180px] h-[180px] sm:ml-5">
        <div
          v-show="currentSong"
          ref="cdRef"
        >
          <img
            ref="cdCoverRef"
            class="w-full h-full rounded-full"
            :class="cdClass"
            :src="currentSong?.cover"
            :alt="currentSong?.title"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-title {
  color: var(--theme-default);
}

.music-time {
  @apply w-10 text-gray-500 text-sm;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.playing {
  animation: rotate 20s linear infinite;
}
</style>
