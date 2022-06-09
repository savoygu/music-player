import { defineStore } from 'pinia'
import { MusicItem, Storage, Mode } from '@/types'
import { BASE_URL, MODE, STORAGE } from '@/constant'
import musicList from './musiclist.json'

interface MusicState {
  currentTab: Storage,
  currentMode: Mode,
  onlineMusics: MusicItem[],
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
    setCurrentTab (currentTab: Storage) {
      this.currentTab = currentTab
    },
    setCurrentMode (currentMode: Mode) {
      this.currentMode = currentMode
    },

    async fetchMusics () {
      const res = await fetch(BASE_URL + '/qiniu/get_musics?filename=default.json')
        .then(response => response.json())
      if (res.success) {
        this.onlineMusics = res.data
      }
    },

    addToLocal (music: MusicItem) {
      this.localMusics.push(music)
    },
    removeFromLocal (music: MusicItem) {
      this.localMusics = this.localMusics.filter(item => {
        return !(item.title === music.title && item.artist === music.artist)
      })
    }
  }
})
