import { ViewGridList, ViewGridCard } from '@icon-park/vue-next'
import { computed, defineComponent, onMounted, ref } from 'vue'
import './MusicList.scss'
import MusicItem from '@/components/music-item/MusicItem'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { MusicItem as IMusicItem } from '@/types'
import { STORAGE, MODE } from '@/utils/enums'

export default defineComponent({
  name: 'MusicList',
  setup () {
    // store
    const playerStore = usePlayerStore()
    const musicStore = useMusicStore()
    const currentTab = computed(() => musicStore.currentTab)
    const currentMode = computed(() => musicStore.currentMode)
    const onlineMusics = computed(() => musicStore.onlineMusics)
    const localMusics = computed(() => musicStore.localMusics)

    // computed
    const tabRef = ref<STORAGE>(currentTab.value)
    const musicList = computed<IMusicItem[]>(() =>
      tabRef.value === STORAGE.ONLINE ? onlineMusics.value : localMusics.value
    )

    // methods
    const switchTab = (tab: STORAGE) => {
      tabRef.value = tab
    }
    const switchMode = (mode: MODE) => {
      musicStore.setCurrentMode(mode)
    }
    const selectItem = (song: IMusicItem, index: number) => {
      musicStore.setCurrentTab(tabRef.value)
      playerStore.selectPlay({
        sequenceList: musicList.value,
        currentIndex: index
      })
    }

    // lifecycle
    onMounted(() => {
      musicStore.fetchMusics()
    })

    return () => (
      <div class="musiclist my-8">
        <div class="music-header mb-5">
          <div class="music-tabs">
            <span
              class={{ 'is-active': tabRef.value === STORAGE.LOCALE }}
              onClick={ () => switchTab(STORAGE.LOCALE) }
            >本地</span>
            <span
              class={['ml-2.5', { 'is-active': tabRef.value === STORAGE.ONLINE }]}
              onClick={ () => switchTab(STORAGE.ONLINE) }
            >在线</span>
          </div>
          <span class="music-mode">
            {
              currentMode.value === MODE.CARD && <ViewGridCard
                theme="outline"
                size="24"
                fill="#6b7280"
                onClick={ () => switchMode(MODE.LIST) }
              />
            }
            {
              currentMode.value === MODE.LIST && <ViewGridList
                theme="outline"
                size="24"
                fill="#6b7280"
                onClick={ () => switchMode(MODE.CARD) }
              />
            }
          </span>
        </div>

        <div
          class={['music-list', { 'mode-card': currentMode.value === MODE.CARD }]}
        >
          {
            musicList.value.map((item, index) => {
              return (
                <MusicItem
                  musicItem={ item }
                  currentTab={ tabRef.value }
                  onClick={ () => selectItem(item, index) }
                />
              )
            })
          }
        </div>
      </div>
    )
  }
})
