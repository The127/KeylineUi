import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/debug',
        name: 'debug',
        component:  () => import('../views/Debug.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component:  () => import('../views/Login.vue'),
        meta: {
            layout: "login-layout",
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
