import { GithubOne } from '@icon-park/vue-next'
import { defineComponent } from 'vue'
import './Footer.scss'

export default defineComponent({
  name: 'Footer',
  setup () {
    return () => (
      <div class="footer">
        <a
          href="https://github.com/savoygu/music-player"
          target="_blank"
          title="Create by @savoygu"
        >
          <GithubOne
            theme="outline"
            size="24"
            fill="3"
          />
        </a>
      </div>
    )
  }
})
