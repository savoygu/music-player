import { defineStore } from 'pinia'
import { MusicItem } from '@/types'
import { BASE_URL } from '@/utils/constants'
import { MODE, STORAGE } from '@/utils/enums'
import musicList from './musiclist.json'

interface MusicState {
  currentTab: STORAGE
  currentMode: MODE
  onlineMusics: MusicItem[]
  localMusics: MusicItem[]
}

export const useMusicStore = defineStore('musiclist', {
  state: (): MusicState => ({
    currentTab: STORAGE.LOCALE,
    currentMode: MODE.LIST,
    onlineMusics: [],
    localMusics: musicList
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'music-player_musiclist',
        storage: localStorage
      }
    ]
  },
  actions: {
    setCurrentTab (currentTab: STORAGE) {
      this.currentTab = currentTab
    },
    setCurrentMode (currentMode: MODE) {
      this.currentMode = currentMode
    },

    async fetchMusics () {
      try {
        const res = await fetch(
          BASE_URL + '/qiniu/get_musics?filename=default.json'
        ).then((response) => response.json())
        if (res.success) {
          this.onlineMusics = res.data
        }
      } catch (err) {
        console.error(err)
      }
    },

    addToLocal (music: MusicItem) {
      this.localMusics.push(music)
    },
    removeFromLocal (music: MusicItem) {
      this.localMusics = this.localMusics.filter((item) => {
        return !(item.title === music.title && item.artist === music.artist)
      })
    }
  }
})
