import {createRouter, createWebHistory} from 'vue-router'
import Studio from '@/views/Studio.vue'

const routes = [
    {
        path: '/',
        name: 'studio',
        component: Studio
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

export default routes