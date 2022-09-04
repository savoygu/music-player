import { computed, defineComponent } from 'vue'
import './Switch.scss'

export default defineComponent({
  name: 'Switch',
  props: {
    modelValue: {
      type: Boolean
    },
    onText: {
      type: String,
      default: '开'
    },
    offText: {
      type: String,
      default: '关'
    },
    onLeverBgColor: {
      type: String,
      default: '#6bc30d'
    },
    offLeverBgColor: {
      type: String,
      default: '#fdfdfd'
    },
    onTextColor: {
      type: String,
      default: '#6bc30d'
    },
    offTextColor: {
      type: String,
      default: '#6bc30d'
    },
    onBgColor: {
      type: String,
      default: '#fdfdfd'
    },
    offBgColor: {
      type: String,
      default: '#fdfdfd'
    },
    onValue: {
      type: Boolean,
      default: true
    },
    offValue: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    labelText: String
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const checked = computed(() => props.modelValue)

    const leverStyle = computed(() => {
      return { backgroundColor: checked.value ? props.onLeverBgColor : props.offLeverBgColor }
    })

    const switchStyle = computed(() => {
      return {
        color: checked.value ? props.onTextColor : props.offTextColor,
        backgroundColor: checked.value ? props.onBgColor : props.offBgColor
      }
    })

    function handleChange (e: any) {
      emit('update:modelValue', e.target.checked ? props.onValue : props.offValue)
    }

    return () => (
      <div class="mt-switch">
        <label>
          <span class="mt-switch__text">
            <slot>{ props.labelText }</slot>
          </span>
          <input
            checked={props.modelValue}
            type="checkbox"
            disabled={props.disabled}
            onInput={handleChange}
          />
          <div
            class="mt-switch__lever"
            style={leverStyle.value}
          >
            <span
              class={checked.value ? 'mt-switch__on' : 'mt-switch__off'}
              style={switchStyle.value}
            >
              { checked.value ? props.onText : props.offText }
            </span>
          </div>
        </label>
      </div>
    )
  }
})
