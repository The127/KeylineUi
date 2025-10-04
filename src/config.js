const runtime = typeof window !== 'undefined' && window.__ENV__ ? window.__ENV__ : {}

export function ConfigApiUrl() {
    return runtime.KEYLINE_API_URL ?? 'http://127.0.0.1:8081'
}

export function ConfigHost() {
    return runtime.KEYLINE_HOST ?? "http://localhost:5173"
}

