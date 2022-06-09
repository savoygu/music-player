<script setup lang="ts">
import { ref } from 'vue'
import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'
import Audio from './components/Audio.vue'

const audioRef = ref<InstanceType<typeof Audio> | null>(null)

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
  <div class="relative w-full min-h-full px-4 pt-16 pb-10 sm:w-[800px] sm:m-auto">
    <router-view
      @player:prev="prev"
      @player:next="next"
      @player:timechange="changeTime"
      @player:volumechange="changeVolume"
    />
    <Footer />
  </div>
  <Audio ref="audioRef" />
</template>
