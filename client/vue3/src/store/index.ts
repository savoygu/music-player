import { createPinia, defineStore } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

export const useStore = defineStore('main', {
  state: () => {
    return {}
  },
  getters: {},
  actions: {}
})

const pinia = createPinia()
pinia.use(piniaPersist)
export default pinia
