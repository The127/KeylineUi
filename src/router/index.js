import { createRouter, createWebHistory } from 'vue-router'
import {UserManager} from "oidc-client";

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
                beforeEnter: async _ => {
                    return await handleLoginCallback()
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

const mgr = new UserManager({
    authority: "http://127.0.0.1:8081/oidc/keyline",
    metadataUrl: "http://127.0.0.1:8081/oidc/keyline/.well-known/openid-configuration",
    client_id: "admin-ui",
    redirect_uri: "http://localhost:5173/mgmt/keyline/auth",
    response_type: "code",
    scope: "oidc profile email",
})

async function handleLoginCallback() {
    const user = await mgr.signinRedirectCallback()
    console.log("redirect callback", user)
    return user.state.destination;
}

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    console.log("checking auth")
    if (to.meta.requiresAuth) {
        console.log("requires auth")
        if (await mgr.getUser() === null) {
            console.log("redirecting to login")
            const request = await mgr.createSigninRequest(
                {
                    state: {
                        destination: to.fullPath,
                    }
                }
            )
            window.location.assign("http://" + request.url) // <-- bypasses router
            next(false)
        }else {
            console.log("user is logged in")
            next()
        }
    }else{
        console.log("no auth")
        next()
    }
})

export default router
