import { THEME } from '@/constant'
import { Theme } from '@/types'
import { createPinia, defineStore } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

interface RootState {
  theme: Theme,
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
    setTheme (theme: Theme) {
      this.theme = theme
    }
  }
})

const pinia = createPinia()
pinia.use(piniaPersist)
export default pinia
