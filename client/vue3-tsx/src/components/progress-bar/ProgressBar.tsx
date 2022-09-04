import { useEventListener } from '@vueuse/core'
import { computed, defineComponent, onMounted, ref, watch, withModifiers } from 'vue'
import './ProgressBar.scss'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    progress: Number,
    hasBtn: {
      type: Boolean,
      default: true
    },
    barColor: String
  },
  emits: ['progressChanging', 'progressChanged'],
  setup (props, { emit }) {
    const progressBarWidth = 16

    // reactive
    const offset = ref(0)
    const barRef = ref<HTMLDivElement | null>(null)
    const progressRef = ref<HTMLDivElement | null>(null)

    // computed
    const progressStyle = computed(() => {
      return {
        width: `${offset.value}px`,
        backgroundColor: props.barColor
      }
    })
    const btnStyle = computed(() => {
      return {
        transform: `translate3d(${offset.value}px,0,0)`
      }
    })

    // watch
    watch(
      () => props.progress,
      (newProgress) => {
        if (!barRef.value) return

        const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
        offset.value = barWidth * newProgress!
      }
    )

    // lifecycle
    onMounted(() => {
      if (!barRef.value) return

      const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
      offset.value = barWidth * props.progress!
    })

    // methods：drag & drop
    const touch = {
      x1: 0,
      beginWidth: 0
    }
    let touching = false
    const onTouchStart = (e: TouchEvent | MouseEvent) => {
      if (!progressRef.value) return

      touching = true
      touch.x1 = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX // 鼠标开始位置
      touch.beginWidth = progressRef.value.clientWidth // 进度条当前进度
    }
    const onTouchMove = (e: TouchEvent | MouseEvent) => {
      if (!touching || !barRef.value) return

      const delta =
    (e instanceof TouchEvent ? e.touches[0].pageX : e.pageX) - touch.x1 // 鼠标移动距离
      const endWidth = touch.beginWidth + delta // 进度条最终进度
      const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
      const progress = Math.min(1, Math.max(endWidth / barWidth, 0))
      offset.value = barWidth * progress

      emit('progressChanging', progress)
    }
    const onTouchEnd = () => {
      if (!touching || !barRef.value || !progressRef.value) return
      touching = false

      const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
      const progress = progressRef.value.clientWidth / barWidth

      emit('progressChanged', progress)
    }
    const onClick = (e: MouseEvent) => {
      if (!barRef.value) return

      const rect = barRef.value.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      const barWidth = barRef.value.clientWidth - (props.hasBtn ? progressBarWidth : 0)
      const progress = Math.min(1, Math.max(offsetWidth / barWidth, 0))

      emit('progressChanged', progress)
    }

    // events
    useEventListener(document, 'mouseup', onTouchEnd)
    useEventListener(document, 'touchend', onTouchEnd)

    return () => (
      <div
        ref={barRef}
        class="progress-bar"
        onClick={onClick}
      >
        <div class="bar-inner">
          <div
            ref={progressRef}
            class="progress"
            style={progressStyle.value}
          />
          <div
            class="progress-btn-wrapper"
            style={btnStyle.value}
            onMousedown={ withModifiers(onTouchStart, ['prevent']) }
            onMousemove={ withModifiers(onTouchMove, ['prevent']) }
            onMouseup={ withModifiers(onTouchEnd, ['prevent']) }
            onTouchstart={ withModifiers(onTouchStart, ['prevent']) }
            onTouchmove={ withModifiers(onTouchMove, ['prevent']) }
            onTouchend={ withModifiers(onTouchEnd, ['prevent']) }
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={ withModifiers(() => {}, ['stop']) }
          >
            <div
              class="progress-btn"
              style={{ backgroundColor: props.barColor }}
            />
          </div>
        </div>
      </div>
    )
  }
})
