import { createRouter, createWebHistory } from 'vue-router'
import {useUserManager} from "../composables/userManager.js";

const routes = [
    {
        path: '/debug',
        name: 'debug',
        component:  () => import('../views/Debug.vue'),
    },
    {
        path: '/debugRedirectTarget',
        name: 'debugRedirectTarget',
        component:  () => import('../views/DebugRedirectTarget.vue'),
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
    {
        path: "/mgmt/:vsName",
        name: 'mgmt',
        component: () => import('../views/mgmt/Management.vue'),
        meta: {
            layout: "main-layout",
            requiresAuth: true,
        },
        children: [
            {
                path: 'auth',
                name: 'mgmt-auth',
                beforeEnter: async route => {
                    return await handleLoginCallback(route)
                },
                meta: {
                    requiresAuth: false,
                }
            },
            {
                path: '',
                name: 'mgmt-dashboard',
                component: () => import('../views/mgmt/Dashboard.vue'),
            }
        ]
    },
]

async function handleLoginCallback(route) {
    const mgr = useUserManager(route.params.vsName)
    const user = await mgr.signinRedirectCallback()
    return user.state.destination;
}

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiresAuth) {
        next()
        return
    }

    const mgr = useUserManager(to.params.vsName)
    if (await mgr.getUser() !== null) {
        next()
        return
    }

    await mgr.signinRedirect({
        state: {
            destination: to.fullPath,
        }
    })
    next(false)
})

export default router
