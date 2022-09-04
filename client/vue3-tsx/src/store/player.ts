import { defineStore } from 'pinia'
import musicList from './musiclist.json'
import { MusicItem } from '@/types'
import { shuffle } from '@/utils'
import { PLAY_MODE } from '@/utils/enums'

interface PlayerState {
  sequenceList: MusicItem[]
  playList: MusicItem[]
  playing: boolean
  playMode: PLAY_MODE
  currentIndex: number
  currentTime: number
  volume: number
  progressChanging: boolean
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => {
    return {
      sequenceList: musicList,
      playList: musicList,
      playing: false,
      playMode: PLAY_MODE.SEQUENCE,
      currentIndex: 0,
      currentTime: 0,
      volume: 1,
      progressChanging: false // 进度条拖拽中，阻止 timeupdate 事件修改 currentTime
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'music-player_player',
        storage: localStorage,
        paths: [
          'sequenceList',
          'playList',
          'playMode',
          'currentIndex',
          'currentTime',
          'volume'
        ]
      }
    ]
  },
  getters: {
    currentSong: (state) => state.playList[state.currentIndex]
  },
  actions: {
    setPlaying (playing: boolean) {
      this.playing = playing
    },
    setSequenceList (sequenceList: MusicItem[]) {
      this.sequenceList = sequenceList
    },
    setPlayList (playList: MusicItem[]) {
      this.playList = playList
    },
    setPlayMode (playMode: PLAY_MODE) {
      this.playMode = playMode
    },
    setCurrentIndex (currentIndex: number) {
      this.currentIndex = currentIndex
    },
    setCurrentTime (currentTime: number) {
      this.currentTime = currentTime
    },
    setVolume (volume: number) {
      this.volume = volume
    },
    setProgressChanging (progressChanging: boolean) {
      this.progressChanging = progressChanging
    },

    selectPlay ({
      sequenceList: list,
      currentIndex
    }: Pick<PlayerState, 'sequenceList' | 'currentIndex'>) {
      this.setSequenceList(list)
      this.setPlayList(list)
      this.setPlaying(true)
      this.setPlayMode(PLAY_MODE.SEQUENCE)
      this.setCurrentIndex(currentIndex)
    },

    randomPlay ({ sequenceList: list }: Pick<PlayerState, 'sequenceList'>) {
      this.setSequenceList(list)
      this.setPlayList(shuffle<MusicItem>(list))
      this.setPlaying(true)
      this.setPlayMode(PLAY_MODE.RANDOM)
      this.setCurrentIndex(0)
    },

    changeMode (mode: PLAY_MODE) {
      const { title, artist } = this.currentSong
      if (mode === PLAY_MODE.RANDOM) {
        this.setPlayList(shuffle(this.sequenceList))
      } else {
        this.setPlayList(this.sequenceList)
      }
      const index = this.playList.findIndex(
        (item) => item.title === title && item.artist === artist
      )
      this.setCurrentIndex(index)
      this.setPlayMode(mode)
    }
  }
})
