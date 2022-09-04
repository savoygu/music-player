import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/player/Player') },
  { path: '/musics', component: () => import('@/views/musiclist/MusicList') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
