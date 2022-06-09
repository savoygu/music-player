<script setup lang="ts">
import { computed, ref } from 'vue'
import { ViewGridList, ViewGridCard } from '@icon-park/vue-next'
import MusicItem from '@/components/MusicItem.vue'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { STORAGE, MODE } from '@/constant'
import { MusicItem as IMusicItem, Storage, Mode } from '@/types'

// store
const playerStore = usePlayerStore()
const musicStore = useMusicStore()
const currentTab = computed(() => musicStore.currentTab)
const currentMode = computed(() => musicStore.currentMode)
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
const switchMode = (mode: Mode) => {
  musicStore.setCurrentMode(mode)
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
  <div class="musiclist my-8">
    <div class="music-header mb-5">
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
      <span class="music-mode">
        <ViewGridCard
          v-if="currentMode === MODE.CARD"
          theme="outline"
          size="24"
          fill="#6b7280"
          @click="switchMode(MODE.LIST)"
        />
        <ViewGridList
          v-if="currentMode === MODE.LIST"
          theme="outline"
          size="24"
          fill="#6b7280"
          @click="switchMode(MODE.CARD)"
        />
      </span>
    </div>

    <div
      class="music-list"
      :class="{ 'mode-card': currentMode=== MODE.CARD }"
    >
      <MusicItem
        v-for="(item, index) in musicList"
        :key="item.title + item.artist"
        :music-item="item"
        :current-tab="tabRef"
        @click="selectItem(item, index)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @import "./musiclist";

.music-header {
  @apply flex items-center justify-between;
}

.music-tabs {
  @apply inline-flex items-center h-8 text-sm bg-white shadow-sm rounded-md;

  span {
    @apply w-16 h-full leading-8 text-center text-gray-600 cursor-pointer rounded-md;

    &.is-active {
      @apply text-gray-50;

      background-color: var(--theme-default);
    }
  }
}

.music-mode {
  @apply inline-flex cursor-pointer;

  & ::v-deep(.i-icon) {
    path,
    rect {
      stroke: var(--theme-default);
    }
  }
}

.music-list {
  &.mode-card { // CARD 展示模式
    @apply flex flex-wrap -mx-2;

    > ::v-deep(.music-item) {
      @apply h-44 sm:w-1/4 w-1/2;

      .music-inner {
        @apply relative flex-col mx-2;

        img {
          @apply w-full h-2/3;
        }

        .music-title {
          @apply ml-0 py-2 self-start;
        }

        .music-artist {
          @apply mr-0 self-start;
        }

        .i-icon {
          @apply absolute right-0 bottom-0;
        }
      }
    }
  }
}
</style>
