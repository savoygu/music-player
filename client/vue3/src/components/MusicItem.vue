<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { FolderDownload, Delete } from '@icon-park/vue-next'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { MusicItem, Storage } from '@/types'
import { STORAGE } from '@/constant'
import createToast from './toast'

const props = defineProps<{
  musicItem: MusicItem
  currentTab: Storage
}>()
const { musicItem, currentTab } = toRefs(props)

// store
const playerStore = usePlayerStore()
const musicStore = useMusicStore()
const currentSong = computed(() => playerStore.currentSong)
const localMusics = computed(() => musicStore.localMusics)

// computed
const isActive = computed(() => {
  return musicItem.value.title === currentSong.value?.title &&
  musicItem.value.artist === currentSong.value?.artist
})
const inLocal = computed(() => {
  return !!localMusics.value.find(item => item.title === musicItem.value.title && item.artist === musicItem.value.artist)
})

// methods
const addToLocal = () => {
  musicStore.addToLocal(musicItem.value)
  createToast({ text: '已添加到本地' })
}
const removeFromLocal = () => {
  musicStore.removeFromLocal(musicItem.value)
  createToast({ text: '移除成功' })
}

</script>

<template>
  <div
    class="music-item"
    :class="{ 'is-active': isActive }"
  >
    <div class="music-inner">
      <img
        v-lazy="musicItem.cover"
        class="w-10 h-10"
        :alt="musicItem.title"
      >
      <span class="music-title ml-2.5 text-sm text-gray-800">{{ musicItem.title }}</span>
      <span class="music-artist mr-auto text-xs text-gray-500">
        <i class="mx-1.5">-</i>{{ musicItem.artist }}
      </span>
      <FolderDownload
        v-if="STORAGE.ONLINE === currentTab && !inLocal"
        class="p-2"
        theme="outline"
        size="16"
        fill="#333"
        @click.stop="addToLocal"
      />
      <Delete
        v-if="STORAGE.LOCALE === currentTab"
        class="p-2"
        theme="outline"
        size="16"
        fill="#333"
        @click.stop="removeFromLocal"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music-item {
  @apply h-16 mb-2.5 cursor-pointer ;

  .music-inner {
    @apply flex items-center h-full p-3 bg-white rounded shadow-md;

    & ::v-deep(.i-icon) {
      path {
        stroke: var(--theme-default);
      }
    }
  }

  &.is-active {
    .music-inner {
      background-color: var(--theme-default);

      span {
        @apply text-gray-50;
      }

      & ::v-deep(.i-icon) {
        path {
          stroke: #f9fafb;
        }
      }
    }
  }
}
</style>
