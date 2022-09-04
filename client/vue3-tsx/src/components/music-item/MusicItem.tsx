import { FolderDownload, Delete } from '@icon-park/vue-next'
import { computed, defineComponent, PropType, withModifiers } from 'vue'
import createToast from '../toast'
import './MusicItem.scss'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { MusicItem } from '@/types'
import { STORAGE } from '@/utils/enums'

export default defineComponent({
  name: 'MusicItem',
  props: {
    musicItem: {
      type: Object as PropType<MusicItem>,
      required: true
    },
    currentTab: {
      type: Number as PropType<STORAGE>
    }
  },
  emits: ['click'],
  setup (props, { emit }) {
    // store
    const playerStore = usePlayerStore()
    const musicStore = useMusicStore()
    const currentSong = computed(() => playerStore.currentSong)
    const localMusics = computed(() => musicStore.localMusics)

    // computed
    const isActive = computed(() => {
      return props.musicItem.title === currentSong.value?.title &&
      props.musicItem.artist === currentSong.value?.artist
    })
    const inLocal = computed(() => {
      return !!localMusics.value.find(item => item.title === props.musicItem.title && item.artist === props.musicItem.artist)
    })

    // methods
    const addToLocal = () => {
      musicStore.addToLocal(props.musicItem)
      createToast({ text: '已添加到本地' })
    }
    const removeFromLocal = () => {
      musicStore.removeFromLocal(props.musicItem)
      createToast({ text: '移除成功' })
    }

    return () => (
      <div class={['music-item', isActive.value ? 'is-active' : '']} onClick={ () => emit('click') }>
        <div class="music-inner">
          <img
            v-lazy={ props.musicItem.cover }
            class="w-10 h-10"
            alt={ props.musicItem.title }
          />
          <span class="music-title ml-2.5 text-sm text-gray-800">{ props.musicItem.title }</span>
          <span class="music-artist mr-auto text-xs text-gray-500">
            <i class="mx-1.5">-</i>{ props.musicItem.artist }
          </span>
          {
            STORAGE.ONLINE === props.currentTab && !inLocal.value && (
              <FolderDownload
                class="p-2"
                theme="outline"
                size="16"
                fill="#333"
                onClick={ withModifiers(addToLocal, ['stop']) }
              />
            )
          }
          {
            STORAGE.LOCALE === props.currentTab && (
              <Delete
                class="p-2"
                theme="outline"
                size="16"
                fill="#333"
                onClick={ withModifiers(removeFromLocal, ['stop']) }
              />
            )
          }
        </div>
      </div>
    )
  }
})
