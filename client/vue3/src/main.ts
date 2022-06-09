import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import './themes/default/index.scss'
import loading from './assets/default.png'

const app = createApp(App)
app.use(lazyPlugin, {
  loading
})
app.use(router)
app.use(store)
app.mount('#app')
