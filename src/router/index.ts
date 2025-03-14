import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/Main.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'studio',
      component: Main
    },
    {
      path: '/browser',
      name: 'browser',
      component: () => import('@/views/RulesBrowser.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue')
    }
  ]
})

export default router