<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  onText?: string // 开关文本
  offText?: string
  onLeverBgColor?: string // 杠杆背景色
  offLeverBgColor?: string
  onTextColor?: string // 开关文字颜色
  offTextColor?: string
  onBgColor?: string // 开关背景色
  offBgColor?: string
  onValue?: boolean
  offValue?: boolean
  disabled?: boolean
  labelText?: string
}>(), {
  modelValue: false,
  onText: '开',
  offText: '关',
  onValue: true,
  offValue: false,
  disabled: false,
  offLeverBgColor: '#fdfdfd',
  onLeverBgColor: '#6bc30d',
  offBgColor: '#fdfdfd',
  onBgColor: '#fdfdfd',
  offTextColor: '#6bc30d',
  onTextColor: '#6bc30d',
  labelText: ''
})

const emit = defineEmits<{(e: 'update:modelValue', modelValue: boolean): void }>()

const checked = ref(props.modelValue)

const switchStyle = computed(() => {
  return {
    color: checked.value ? props.onTextColor : props.offTextColor,
    backgroundColor: checked.value ? props.onBgColor : props.offBgColor
  }
})

function handleChange () {
  emit('update:modelValue', checked.value ? props.onValue : props.offValue)
}

</script>

<template>
  <div class="mt-switch">
    <label>
      <span class="mt-switch__text">
        <slot>{{ labelText }}</slot>
      </span>
      <input
        v-model="checked"
        type="checkbox"
        :true-value="onValue"
        :false-value="offValue"
        :disabled="disabled"
        @change="handleChange"
      >
      <div
        class="mt-switch__lever"
        :style="{ backgroundColor: checked ? onLeverBgColor : offLeverBgColor }"
      >
        <span
          :class="checked ? 'mt-switch__on' : 'mt-switch__off'"
          :style="switchStyle"
        >
          {{ checked ? onText : offText }}
        </span>
      </div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable selector-class-pattern */
@include b(mt-switch) {
  display: inline-block;

  &,
  & * {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  label {
    cursor: pointer;

    input:checked ~ .mt-switch__lever {
      .mt-switch__on {
        right: 0;
        left: auto;
      }
    }

    input:not(:checked) ~ .mt-switch__lever {
      .mt-switch__off {
        right: auto;
        left: 0;
      }
    }

    input[type="checkbox"] {
      width: 0;
      height: 0;
      opacity: 0;

      &:checked {
        + .mt-switch__lever {
          background-color: #22507c;
        }
      }
    }

    input:active:not(:disabled):not(.disabled) ~ .mt-switch__lever {
      .mt-switch__off,
      .mt-switch__on {
        transform: scaleX(1.4);
      }
    }
  }

  @include is(disabled) {
    label {
      cursor: not-allowed;
    }
  }

  @include e(lever) {
    position: relative;
    display: inline-block;
    width: 54px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #dfdfdf;
    background-color: rgb(56 80 114 / 30%);
    border-radius: 14px;
    transition: background 0.3s ease;
    vertical-align: middle;
  }

  @include e(text) {
    font-size: 14px;
  }

  @include parse("e:on", "e:off") {
    position: absolute;
    top: 0;
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgb(0 0 0 / 40%);
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    transition: all 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }

  @include e(on) {
    left: 0;
    background-color: #1e74e9;
    color: #c7c7c9;
  }

  @include e(off) {
    right: 0;
    background-color: #1c519a;
    color: #5787bf;
  }
}
</style>
