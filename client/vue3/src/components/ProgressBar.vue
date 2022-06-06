<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'

const props = withDefaults(defineProps<{
  progress: number
  hasBtn?: boolean
  barColor?: string
}>(), {
  hasBtn: true,
  barColor: ''
})

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'progress-changing', progress: number): void,
  (e: 'progress-changed', progress: number): void
}>()

const progressBarWidth = 16

const offset = ref(0)
const barRef = ref<HTMLDivElement | null>(null)
const progressRef = ref<HTMLDivElement | null>(null)

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

watch(() => props.progress, (newProgress) => {
  const barWidth = barRef.value?.clientWidth! - (props.hasBtn ? progressBarWidth : 0)
  offset.value = barWidth * newProgress
})

const touch = {
  x1: 0,
  beginWidth: 0
}
let touching = false
const onTouchStart = (e: TouchEvent | MouseEvent) => {
  touching = true
  touch.x1 = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX // 鼠标开始位置
  touch.beginWidth = progressRef.value?.clientWidth! // 进度条当前进度
}
const onTouchMove = (e: TouchEvent | MouseEvent) => {
  if (!touching) return

  const delta = (e instanceof TouchEvent ? e.touches[0].pageX : e.pageX) - touch.x1 // 鼠标移动距离
  const endWidth = touch.beginWidth + delta // 进度条最终进度
  const barWidth = barRef.value?.clientWidth! - (props.hasBtn ? progressBarWidth : 0)
  const progress = Math.min(1, Math.max(endWidth / barWidth, 0))
  offset.value = barWidth * progress

  emit('progress-changing', progress)
}
const onTouchEnd = (e: Event) => {
  if (!touching) return
  touching = false

  const barWidth = barRef.value?.clientWidth! - (props.hasBtn ? progressBarWidth : 0)
  const progress = progressRef.value?.clientWidth! / barWidth

  emit('progress-changed', progress)
}
const onClick = (e: MouseEvent) => {
  const rect = barRef.value?.getBoundingClientRect()!
  const offsetWidth = e.pageX - rect.left
  const barWidth = barRef.value?.clientWidth! - (props.hasBtn ? progressBarWidth : 0)
  const progress = Math.min(1, Math.max(offsetWidth / barWidth, 0))

  emit('progress-changed', progress)
}

useEventListener(document, 'mouseup', onTouchEnd)
useEventListener(document, 'touchend', onTouchEnd)

onMounted(() => {
  const barWidth = barRef.value?.clientWidth! - (props.hasBtn ? progressBarWidth : 0)
  offset.value = barWidth * props.progress
})

</script>

<template>
  <div
    ref="barRef"
    class="progress-bar"
    @click="onClick"
  >
    <div class="bar-inner">
      <div
        ref="progressRef"
        class="progress"
        :style="progressStyle"
      />
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @mousedown.prevent="onTouchStart"
        @mousemove.prevent="onTouchMove"
        @mouseup.prevent="onTouchEnd"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
        @click.stop
      >
        <div
          class="progress-btn"
          :style="{ backgroundColor: props.barColor }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  cursor: pointer;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background-color: #ddd;
  }

  .progress {
    position: absolute;
    height: 100%;
    background-color: var(--theme-default);
  }
}

.progress-btn-wrapper {
  position: absolute;
  top: -13px;
  left: -7px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  .progress-btn {
    position: relative;
    top: 7px;
    left: 7px;
    width: 16px;
    height: 16px;
    border: 3px solid #ddd;
    background-color: var(--theme-default);
    border-radius: 50%;
  }
}
</style>
