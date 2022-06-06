<script setup lang="ts">
import { STORAGE } from '@/constant'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { computed } from 'vue'

const musicStore = useMusicStore()
const playerStore = usePlayerStore()
const currentTab = computed(() => musicStore.currentTab)
const musicList = computed(() => currentTab.value === STORAGE.ONLINE
  ? musicStore.onlineMusics
  : musicStore.localMusics
)
const currentSong = computed(() => playerStore.currentSong)
const currentIndex = computed(() => musicList.value.findIndex(item => item.title === currentSong.value.title && item.artist === currentSong.value.artist))

</script>

<template>
  <div class="header">
    <router-link
      to="/"
      class="flex items-center"
    >
      <img
        src="/src/assets/logo.png"
        alt="Logo"
        width="36"
      >
      <h1 class="text-xl ml-4">
        Music Player
      </h1>
    </router-link>
    <span
      v-if="currentSong"
      class="ml-auto text-sm"
    >{{ STORAGE.ONLINE === currentTab ? '在线' : '本地' }}模式 [ {{ currentIndex + 1 }} / {{ musicList.length }} ]</span>
  </div>
</template>

<style lang="scss" scoped>
.header {
  @apply flex items-center px-3 sm:px-6 py-3.5 bg-white shadow-sm fixed w-full top-0;

  span {
    color: var(--theme-default);
  }
}
</style>
