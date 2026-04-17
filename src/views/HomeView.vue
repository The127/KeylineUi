<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { listActiveSessions, deleteActiveSession } from '../api/sessions.js'

const router = useRouter()

const sessions = ref([])
const loaded = ref(false)

async function fetchSessions() {
    try {
        sessions.value = await listActiveSessions()
    } finally {
        loaded.value = true
    }
}

async function logout(session) {
    await deleteActiveSession(session.vsName)
    await fetchSessions()
}

function navigate(vsName) {
    router.push({ name: 'mgmt-dashboard', params: { vsName } })
}

onMounted(fetchSessions)
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-semibold text-slate-800">Keyline</h1>
    </div>

    <template v-if="loaded">
      <template v-if="sessions.length > 0">
        <div class="flex flex-col gap-2">
          <p class="text-sm text-slate-500">You are logged in to:</p>
          <div
            v-for="session in sessions"
            :key="session.vsName"
            class="flex flex-row items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <div class="flex flex-col">
              <span class="font-medium text-slate-800">{{ session.vsName }}</span>
              <span class="text-xs text-slate-400">{{ session.displayName || session.username }}</span>
            </div>
            <div class="flex flex-row gap-2">
              <button
                class="text-sm text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                @click="navigate(session.vsName)"
              >
                Go to dashboard
              </button>
              <span class="text-slate-300">|</span>
              <button
                class="text-sm text-slate-400 hover:text-slate-600 cursor-pointer"
                @click="logout(session)"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col gap-3 text-slate-600">
          <p class="text-sm">To access your tenant, navigate to:</p>
          <code class="rounded bg-slate-200 px-3 py-2 text-sm text-slate-700">/mgmt/<span class="italic">your-tenant-name</span></code>
          <p class="text-xs text-slate-400">e.g. /mgmt/acme-corp</p>
        </div>
      </template>
    </template>
  </div>
</template>
