import {toValue} from "vue";

export async function apiFetch(url, options = {}) {
    const opts = { ...options }
    const method = (opts.method || "GET").toUpperCase()

    // Add JSON body + header only for write methods
    if (opts.body && ["POST", "PUT", "PATCH"].includes(method)) {
        if (typeof opts.body === "object") {
            opts.body = JSON.stringify(opts.body)
        }
        opts.headers = {
            ...(opts.headers || {}),
            "Content-Type": "application/json",
        }
    }

    const response = await fetch(url, opts)

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