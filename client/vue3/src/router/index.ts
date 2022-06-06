import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/player/Player.vue') },
  { path: '/musics', component: () => import('../views/musiclist/MusicList.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
