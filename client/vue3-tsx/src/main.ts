import { createApp } from 'vue'
import lazyPlugin from 'vue3-lazy'
import App from './App'

import loading from './assets/default.png'
import router from './router'
import store from './store'

import './themes/default/index.scss'

const app = createApp(App)
app.use(lazyPlugin, {
  loading
})
app.use(router)
app.use(store)
app.mount('#app')
