import {toValue} from "vue";
import {useUserManager} from "../composables/userManager.js";

export async function apiFetch(url, options = {}) {
    const opts = { ...options }
    const method = (opts.method || "GET").toUpperCase()

    const userMgr = opts.vsName ? useUserManager(opts.vsName) : null

    const buildHeaders = (token) => {
        const headers = { ...(opts.headers || {}) }

        if (opts.body && ["POST", "PUT", "PATCH"].includes(method)) {
            if (typeof opts.body === "object") {
                opts.body = JSON.stringify(opts.body)
            }
            headers["Content-Type"] = "application/json"
        }

        if (token) {
            headers["Authorization"] = "Bearer " + token
        }

        return headers
    }

    const getToken = async () => {
        if (!userMgr) return null
        const user = await userMgr.getUser()
        return user?.access_token ?? null
    }

    const doFetch = async (token) => {
        return await fetch(url, { ...opts, headers: buildHeaders(token) })
    }

    let token = await getToken()
    let response = await doFetch(token)

    if (response.status === 401 && userMgr) {
        try {
            const user = await userMgr.signinSilent()
            token = user?.access_token ?? null
            response = await doFetch(token)
        } catch {
            await userMgr.signinRedirect()
            return
        }
    }

    if (!response.ok) {
        throw new Error(`API error ${response.status}: ${response.statusText}`)
    }

    if (response.status === 204) {
        return null
    }

    return response.json()
}

export function applyQueryOps(url, queryOps) {
    if (toValue(queryOps?.page)) {
        url.searchParams.append('page', toValue(queryOps.page) ?? 1)
    }
    if (toValue(queryOps?.pageSize)) {
        url.searchParams.append('pageSize', toValue(queryOps.pageSize) ?? 10)
    }
    if (toValue(queryOps?.orderBy)) {
        url.searchParams.append('orderBy', toValue(queryOps.orderBy))
    }
    if (toValue(queryOps?.orderDirection)) {
        url.searchParams.append('orderDir', toValue(queryOps.orderDirection))
    }
    if (toValue(queryOps?.search)) {
        url.searchParams.append('search', toValue(queryOps.search))
    }
}