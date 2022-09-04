import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'Toast',
  props: {
    show: Boolean,
    text: String
  },
  setup (props) {
    return () => (
      <transition name="mt-toast">
        <div
          v-show={props.show}
          class="mt-toast"
        >
          <div class="mt-toast__text">
            { props.text }
          </div>
        </div>
      </transition>
    )
  }
})
