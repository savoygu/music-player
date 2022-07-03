import { createApp } from 'vue'
import App from './App.vue'
import lazyPlugin from 'vue3-lazy'

import router from './router'
import store from './store'
import loading from './assets/default.png'

import './themes/default/index.scss'

const app = createApp(App)
app.use(lazyPlugin, {
  loading
})
app.use(router)
app.use(store)
app.mount('#app')
