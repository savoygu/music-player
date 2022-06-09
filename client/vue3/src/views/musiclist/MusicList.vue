<script setup lang="ts">
import { computed, ref } from 'vue'
import MusicItem from '@/components/MusicItem.vue'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { STORAGE } from '@/constant'
import { MusicItem as IMusicItem, Storage } from '@/types'

// store
const playerStore = usePlayerStore()
const musicStore = useMusicStore()
const currentTab = computed(() => musicStore.currentTab)
const onlineMusics = computed(() => musicStore.onlineMusics)
const localMusics = computed(() => musicStore.localMusics)

// computed
const tabRef = ref(currentTab.value)
const musicList = computed(() =>
  tabRef.value === STORAGE.ONLINE ? onlineMusics.value : localMusics.value
)

// methods
const switchTab = (tab: Storage) => {
  tabRef.value = tab
}
const selectItem = (song: IMusicItem, index: number) => {
  musicStore.setCurrentTab(tabRef.value)
  playerStore.selectPlay({
    sequenceList: musicList.value,
    currentIndex: index
  })
}

fetchMusics()
function fetchMusics () {
  musicStore.fetchMusics()
}

</script>

<template>
  <div class="musiclist mt-8">
    <div class="music-tabs">
      <span
        :class="{ 'is-active': tabRef === STORAGE.LOCALE }"
        @click="switchTab(STORAGE.LOCALE)"
      >本地</span>
      <span
        class="ml-2.5"
        :class="{ 'is-active': tabRef === STORAGE.ONLINE }"
        @click="switchTab(STORAGE.ONLINE)"
      >在线</span>
    </div>

    <MusicItem
      v-for="(item, index) in musicList"
      :key="item.title + item.artist"
      :music-item="item"
      :current-tab="tabRef"
      @click="selectItem(item, index)"
    />
  </div>
</template>

<style lang="scss" scoped>
// @import "./musiclist";
.music-tabs {
  @apply inline-flex items-center h-8 mb-5 text-sm bg-white shadow-sm rounded-md;

  span {
    @apply w-16 h-full leading-8 text-center text-gray-800 cursor-pointer rounded-md;

    &.is-active {
      @apply text-gray-50;

      background-color: var(--theme-default);
    }
  }
}
</style>
