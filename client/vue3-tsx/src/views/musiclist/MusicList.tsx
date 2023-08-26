import { ViewGridList, ViewGridCard, ExpandDown, ExpandUp } from '@icon-park/vue-next'
import { computed, defineComponent, onMounted, ref } from 'vue'
import './MusicList.scss'
import MusicItem from '@/components/music-item/MusicItem'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { MusicItem as IMusicItem, Singer as ISinger } from '@/types'
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

    const isExpand = ref(false)
    const currentSinger = ref('')

    // computed
    const tabRef = ref<STORAGE>(currentTab.value)
    const musicList = computed<IMusicItem[]>(() =>
      tabRef.value === STORAGE.ONLINE ? onlineMusics.value : localMusics.value
    )
    const singerList = computed<ISinger[]>(() => {
      const artistMap = musicList.value.reduce((map, item) => {
        if (map[item.artist]) {
          map[item.artist]++
        } else {
          map[item.artist] = 1
        }
        return map
      }, {} as Record<string, number>)
      const artistMapSorted = Object.entries(artistMap).sort((a, b) => {
        return b[1] - a[1]
      })
      return artistMapSorted.map((item) => {
        return { artist: item[0], count: item[1] }
      })
    })
    const expandIcon = computed(() => {
      return isExpand.value ? ExpandUp : ExpandDown
    })
    const filterMusicList = computed<IMusicItem[]>(() => {
      return !currentSinger.value
        ? musicList.value
        : musicList.value.filter(item => {
          return item.artist === currentSinger.value
        })
    })

    // methods
    const selectSinger = (singer = '') => {
      currentSinger.value = singer
    }
    const switchExpand = () => {
      isExpand.value = !isExpand.value
    }
    const switchTab = (tab: STORAGE) => {
      tabRef.value = tab
      selectSinger()
    }
    const switchMode = (mode: MODE) => {
      musicStore.setCurrentMode(mode)
    }
    const selectItem = (song: IMusicItem, index: number) => {
      musicStore.setCurrentTab(tabRef.value)
      playerStore.selectPlay({
        sequenceList: filterMusicList.value,
        currentIndex: index
      })
    }

    // lifecycle
    onMounted(() => {
      musicStore.fetchMusics()
    })

    return () => (
      <div class="musiclist my-8">
        <div class="music-header mb-4">
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
        <div class="relative mb-5">
          <div class={['music-singers', { 'is-expand': isExpand.value }]}>
            <span
              class={['music-singer', { 'is-active': currentSinger.value === '' }]}
              onClick={() => selectSinger()}
            >全部({musicList.value.length})</span>
            {singerList.value.map((item, index) =>
              <span
                class={['music-singer', { 'is-active': currentSinger.value === item.artist }]}
                key={index}
                onClick={() => selectSinger(item.artist)}
              >{item.artist}({item.count})</span>
            )}
          </div>
          <div class="music-expand">
            <expandIcon.value
              theme="outline"
              size="24"
              fill="#6b7280"
              onClick={() => switchExpand()}
            >
            </expandIcon.value>
          </div>
        </div>
        <div
          class={['music-list', { 'mode-card': currentMode.value === MODE.CARD }]}
        >
          {
            filterMusicList.value.map((item, index) => {
              return (
                <MusicItem
                  key={item.title + item.artist}
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
