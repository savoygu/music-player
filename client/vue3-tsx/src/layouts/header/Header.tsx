import { computed, defineComponent, ref, watch } from 'vue'
import './Header.scss'
import Switch from '@/components/switch/Switch'
import { useStore } from '@/store'
import { useMusicStore } from '@/store/musiclist'
import { usePlayerStore } from '@/store/player'
import { setTheme } from '@/themes'
import { STORAGE, THEME } from '@/utils/enums'

export default defineComponent({
  name: 'Header',
  setup () {
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

    return () => (
      <div class="header">
        <router-link
          to="/"
          class="flex items-center"
        >
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            width="32"
          />
          <h1 class="text-lg ml-2">
            Music Player
          </h1>
        </router-link>
        {
          currentSong.value && <span
            class="ml-auto mr-1 text-sm"
          >{ STORAGE.ONLINE === currentTab.value ? '在线' : '本地' }模式[{ currentIndex.value + 1 } / { musicList.value.length }]</span>
        }
        <Switch
          v-model={themeRef.value}
          onLeverBgColor="#2f9842"
          onTextColor="#2f9842"
          onText="绿"
          offLeverBgColor="#ea6248"
          offTextColor="#ea6248"
          offText="橙"
        />
      </div>
    )
  }
})
