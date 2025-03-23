const routes = [
    {
        path: '/',
        name: 'studio',
        component: () => import('@/views/Studio.vue')
    },
    {
        path: '/browser',
        name: 'browser',
        component: () => import('@/views/RulesBrowser.vue'),
        // Add query parameters to allow sharing specific rules
        props: (route) => ({
            ruleId: route.query.ruleId || null
        })
    }
]

export default routes