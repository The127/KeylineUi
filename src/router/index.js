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
    {
        path: '/:virtualServer/signup',
        name: 'signup',
        component:  () => import('../views/SignUp.vue'),
        meta: {
            layout: "login-layout",
        },
    },
    {
        path: '/:virtualServer/email-verified',
        name: 'email-verified',
        component:  () => import('../views/EmailVerified.vue'),
        meta: {
            layout: "login-layout",
        },
    },
    {
        path: "/:virtualServer/forgot-password",
        name: 'forgot-password',
        component: () => import('../views/ForgotPassword.vue'),
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
