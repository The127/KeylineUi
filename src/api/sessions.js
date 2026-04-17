import { ConfigApiUrl } from '../config.js'

export async function listActiveSessions() {
    const res = await fetch(`${ConfigApiUrl()}/api/sessions`, { credentials: 'include' })
    if (!res.ok) return []
    return res.json()
}

export async function deleteActiveSession(vsName) {
    await fetch(`${ConfigApiUrl()}/api/sessions/${encodeURIComponent(vsName)}`, {
        method: 'DELETE',
        credentials: 'include',
    })
}
