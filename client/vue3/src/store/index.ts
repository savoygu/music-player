import { createPinia, defineStore } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { THEME } from '@/utils/enums'

interface RootState {
  theme: THEME
}

export const useStore = defineStore('main', {
  state: (): RootState => {
    return {
      theme: THEME.GREEN
    }
  },
  getters: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'music-player_root',
        storage: localStorage
      }
    ]
  },
  actions: {
    setTheme (theme: THEME) {
      this.theme = theme
    }
  }
})

const pinia = createPinia()
pinia.use(piniaPersist)
export default pinia
