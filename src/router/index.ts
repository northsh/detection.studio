import {createRouter, createWebHistory} from 'vue-router'
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
      component: () => import('@/views/RulesBrowser.vue'),
      // Add query parameters to allow sharing specific rules
      props: (route) => ({
        ruleId: route.query.ruleId || null
      })
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue')
    }
  ]
})

export default router