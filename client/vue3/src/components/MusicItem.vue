<script setup lang="ts">
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { MusicItem, Storage } from '@/types'
import { computed, toRefs } from 'vue'
import { FolderDownload, Delete } from '@icon-park/vue-next'
import { STORAGE } from '@/constant'
import createToast from './toast'

const props = defineProps<{
  musicItem: MusicItem
  currentTab: Storage
}>()

const playerStore = usePlayerStore()
const musicStore = useMusicStore()
const { musicItem, currentTab } = toRefs(props)

const currentSong = computed(() => playerStore.currentSong)
const isActive = computed(() => {
  return musicItem.value.title === currentSong.value?.title &&
  musicItem.value.artist === currentSong.value?.artist
})
const localMusics = computed(() => musicStore.localMusics)

const inLocal = computed(() => {
  return !!localMusics.value.find(item => item.title === musicItem.value.title && item.artist === musicItem.value.artist)
})

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
  <li
    class="music-item"
    :class="{ 'is-active': isActive }"
  >
    <div class="flex items-center">
      <img
        class="w-10 h-10"
        :src="musicItem.cover"
        :alt="musicItem.title"
      >
      <span class="ml-2.5 text-sm text-gray-800">{{ musicItem.title }}</span>
      <span class="text-xs text-gray-500">
        <i class="mx-1.5">-</i>{{ musicItem.artist }}
      </span>
    </div>
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
  </li>
</template>

<style lang="scss" scoped>
.music-item {
  @apply flex justify-between items-center h-16 p-2.5 mb-2.5 rounded bg-white shadow-md cursor-pointer;

  &.is-active {
    background-color: var(--theme-default);

    span {
      @apply text-gray-50;
    }

    & > ::v-deep(.i-icon) {
      path {
        stroke: #f9fafb;
      }
    }
  }
}
</style>
