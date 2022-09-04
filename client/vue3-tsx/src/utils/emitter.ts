import mitt from 'mitt'

type Events = {
  prev: void
  next: void
  changeTime: number
  changeVolume: number
}

export default mitt<Events>()
