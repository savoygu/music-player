<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import Switch from '@/components/Switch.vue'
import { STORAGE, THEME } from '@/utils/enums'
import { setTheme } from '@/themes'

// store
const store = useStore()
const musicStore = useMusicStore()
const playerStore = usePlayerStore()
const currentTab = computed(() => musicStore.currentTab)
const musicList = computed(() => currentTab.value === STORAGE.ONLINE
  ? musicStore.onlineMusics
  : musicStore.localMusics
)
const currentSong = computed(() => playerStore.currentSong)
const currentIndex = computed(() => musicList.value.findIndex(item => item.title === currentSong.value.title && item.artist === currentSong.value.artist))

// reactive
const themeRef = ref(store.theme === THEME.GREEN)

// watch
watch(themeRef, (newTheme) => {
  const newThemeVal = newTheme ? THEME.GREEN : THEME.ORANGE
  setTheme(newThemeVal)
  store.setTheme(newThemeVal)
}, {
  immediate: true
})

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
        width="32"
      >
      <h1 class="text-lg ml-2">
        Music Player
      </h1>
    </router-link>
    <span
      v-if="currentSong"
      class="ml-auto mr-1 text-sm"
    >{{ STORAGE.ONLINE === currentTab ? '在线' : '本地' }}模式[{{ currentIndex + 1 }} / {{ musicList.length }}]</span>
    <Switch
      v-model="themeRef"
      on-lever-bg-color="#2f9842"
      on-text-color="#2f9842"
      on-text="绿"
      off-lever-bg-color="#ea6248"
      off-text-color="#ea6248"
      off-text="橙"
    />
  </div>
</template>

<style lang="scss" scoped>
.header {
  @apply flex items-center px-3 sm:px-6 py-3.5 bg-white shadow-sm fixed w-full top-0 z-50;

  span {
    color: var(--theme-default);
  }
}
</style>
