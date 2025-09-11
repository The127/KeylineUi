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
            breadcrumbFn: () => "Home",
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
                },
            },
            {
                path: 'logout',
                name: 'mgmt-logout',
                beforeEnter: async route => {
                    return await handleLogoutCallback(route)
                },
                meta: {
                    requiresAuth: false,
                },
            },
            {
                path: '',
                name: 'mgmt-dashboard',
                component: () => import('../views/mgmt/Dashboard.vue'),
            },
            {
                path: 'applications',
                name: 'mgmt-applications-root',
                meta: {
                    breadcrumbFn: () => "Applications",
                },
                children: [
                    {
                        path: '',
                        name: 'mgmt-applications',
                        component: () => import('../views/mgmt/applications/Applications.vue'),
                    },
                    {
                        path: 'applications/:appId',
                        name: 'mgmt-application-details',
                        component: () => import('../views/mgmt/applications/details/ApplicationDetails.vue'),
                        meta: {
                            breadcrumbFn: async () => "Details",
                        },
                    },
                ],
            },
            {
                path: 'users',
                name: 'mgmt-users-root',
                meta: {
                    breadcrumbFn: async () => "Users",
                },
                children: [
                    {
                        path: '',
                        name: 'mgmt-users',
                        component: () => import('../views/mgmt/users/Users.vue'),
                    },
                    {
                        path: 'users/:userId',
                        name: 'mgmt-user-details',
                        component: () => import('../views/mgmt/users/details/UserDetails.vue'),
                        meta: {
                            breadcrumbFn: async () => "Details",
                        },
                    },
                ],
            },
            {
                path: 'profile',
                name: 'mgmt-profile',
                component: () => import('../views/mgmt/profile/Profile.vue'),
                meta: {
                    breadcrumbFn: async () => "Profile",
                },
            },
        ]
    },
]

async function handleLoginCallback(route) {
    const mgr = useUserManager(route.params.vsName)
    const user = await mgr.signinRedirectCallback()
    return user.state.destination;
}

async function handleLogoutCallback(route) {
    const mgr = useUserManager(route.params.vsName)
    await mgr.signoutRedirectCallback()
    await mgr.removeUser()
    return `/mgmt/${route.params.vsName}`
}

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const authGuard = async (to, from, next) => {
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
}

router.beforeEach(authGuard)

export default router
