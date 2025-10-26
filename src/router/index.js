import { createRouter, createWebHistory } from 'vue-router'
import {useUserManager} from "../composables/userManager.js";

const routes = [
    {
        path: '/debug',
        name: 'debug',
        component:  () => import('../views/DebugView.vue'),
    },
    {
        path: '/debugRedirectTarget',
        name: 'debugRedirectTarget',
        component:  () => import('../views/DebugRedirectTarget.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component:  () => import('../views/LoginView.vue'),
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
        component: () => import('../views/mgmt/ManagementBaseView.vue'),
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
                component: () => import('../views/mgmt/DashboardView.vue'),
            },
            {
                path: 'projects',
                name: 'mgmt-projects-root',
                meta: {
                    breadcrumbFn: () => "Projects",
                },
                children: [
                    {
                        path: '',
                        name: 'mgmt-projects',
                        component: () => import('../views/mgmt/projects/ProjectsOverview.vue'),
                    },
                    {
                        path: 'projects/:appId',
                        name: 'mgmt-projects-details',
                        component: () => import('../views/mgmt/projects/details/ProjectDetails.vue'),
                        meta: {
                            breadcrumbFn: async () => "Details",
                        },
                    },
                ],
            },
            {
                path: 'admin',
                name: 'mgmt-admin-root',
                meta: {
                    breadcrumbFn: async () => "Administration",
                },
                children: [
                    {
                        path: '',
                        name: 'mgmt-admin',
                        component: () => import('../views/mgmt/administration/AdministrationView.vue'),
                    },
                    {
                        path: 'templates/:templateType',
                        name: 'mgmt-template-details',
                        component: () => import('../views/mgmt/administration/templates/TemplateDetail.vue'),
                        meta: {
                            breadcrumbFn: async () => "Details",
                        },
                    },
                ],
            },
            {
                path: 'groups',
                name: 'mgmt-groups-root',
                meta: {
                    breadcrumbFn: async () => "Groups",
                },
                children: [
                    {
                        path: '',
                        name: 'mgmt-groups',
                        component: () => import('../views/mgmt/groups/GroupsOverview.vue'),
                    }
                ]
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
                        component: () => import('../views/mgmt/users/UsersOverview.vue'),
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
                component: () => import('../views/mgmt/profile/ProfileView.vue'),
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
