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