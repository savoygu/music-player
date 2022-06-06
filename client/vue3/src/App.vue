<script setup lang="ts">
import Header from './layouts/Header.vue'
import Audio from './components/Audio.vue'
import { ref } from 'vue'

const audioRef = ref<null | InstanceType<typeof Audio>>(null)

const prev = () => {
  audioRef.value?.prev()
}
const next = () => {
  audioRef.value?.next()
}
const changeTime = (currentTime: number) => {
  audioRef.value?.changeTime(currentTime)
}
const changeVolume = (volume: number) => {
  audioRef.value?.changeVolume(volume)
}

</script>

<template>
  <Header />
  <div class="w-full px-4 pt-16 sm:w-[800px] sm:m-auto">
    <router-view
      @player:prev="prev"
      @player:next="next"
      @player:timechange="changeTime"
      @player:volumechange="changeVolume"
    />
  </div>
  <Audio ref="audioRef" />
</template>
