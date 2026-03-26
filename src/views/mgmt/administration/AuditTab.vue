<script setup>

import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import DataTable from "../../../components/dataTable/DataTable.vue";
import {useListAuditLogsQuery} from "../../../api/audit.js";
import {useListUsersQuery} from "../../../api/user.js";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import {ChevronDown, Check, X} from "lucide-vue-next";

const route = useRoute()
const expandedRows = ref(new Set())

const {data: usersData} = useListUsersQuery(route.params.vsName, {
  page: 1,
  pageSize: 1000,
})

const userMap = computed(() => {
  const map = new Map()
  if (usersData.value?.items) {
    for (const user of usersData.value.items) {
      map.set(user.id, user)
    }
  }
  return map
})

const getUser = (userId) => {
  if (!userId) return null
  return userMap.value.get(userId) ?? null
}

const getUserLabel = (userId) => {
  const user = getUser(userId)
  if (!user) return userId ? 'Unknown' : '—'
  return user.displayName || user.username
}

const toggleRow = (id) => {
  const next = new Set(expandedRows.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  expandedRows.value = next
}

const formatRequestType = (type) => {
  if (!type) return '—'
  return type
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, s => s.toUpperCase())
}

const formatTimestamp = (ts) => {
  if (!ts) return '—'
  const d = new Date(ts)
  return d.toLocaleString()
}

const formatJson = (obj) => {
  if (!obj) return null
  return JSON.stringify(obj, null, 2)
}

</script>

<template>
  <DataTable
      table-key="07000b7c-ec45-4134-b587-19336b128b44"
      title="Audit Logs"
      :query-fn="(pagination) => useListAuditLogsQuery(route.params.vsName, pagination)"
      :on-click="(entry) => toggleRow(entry.id)"
  >
    <template #columns>
      <DataTableColumn title="User" field="user_id"/>
      <DataTableColumn title="Action" field="request_type"/>
      <DataTableColumn title="Allowed" field="allowed"/>
      <DataTableColumn title="Timestamp" field="audit_created_at" initial-order="desc" enable-order/>
      <DataTableColumn title="" field=""/>
    </template>

    <template #row="{ item: entry }">
      <DataTableCell>
        {{ getUserLabel(entry.userId) }}
      </DataTableCell>
      <DataTableCell>
        <span class="font-medium">{{ formatRequestType(entry.requestType) }}</span>
      </DataTableCell>
      <DataTableCell>
        <span
            class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
            :class="entry.allowed
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-red-50 text-red-700'"
        >
          <Check v-if="entry.allowed" class="w-3 h-3"/>
          <X v-else class="w-3 h-3"/>
          {{ entry.allowed ? 'Allowed' : 'Denied' }}
        </span>
      </DataTableCell>
      <DataTableCell>
        {{ formatTimestamp(entry.createdAt) }}
      </DataTableCell>
      <DataTableCell>
        <ChevronDown
            class="w-4 h-4 text-slate-400 transition-transform"
            :class="{'rotate-180': expandedRows.has(entry.id)}"
        />
      </DataTableCell>
    </template>

    <template #row-detail="{ item: entry }">
      <tr v-if="expandedRows.has(entry.id)">
        <td colspan="5" class="px-5 py-4 bg-slate-50 border-b border-slate-200">
          <div class="flex flex-col gap-4 text-sm">
            <div class="grid grid-cols-2 gap-4">
              <div v-if="entry.userId">
                <h4 class="font-medium text-slate-500 text-xs uppercase tracking-wide mb-2">User</h4>
                <div class="text-slate-700">
                  <template v-if="getUser(entry.userId)">
                    <span class="font-medium">{{ getUser(entry.userId).username }}</span>
                    <span v-if="getUser(entry.userId).displayName" class="text-slate-500 ml-1">({{ getUser(entry.userId).displayName }})</span>
                  </template>
                  <span v-else class="text-slate-500">{{ entry.userId }}</span>
                </div>
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-xs uppercase tracking-wide mb-2">Reason</h4>
                <pre class="bg-slate-100 rounded-md p-3 text-xs text-slate-700 overflow-x-auto">{{ formatJson(entry.allowReason) || '—' }}</pre>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium text-slate-500 text-xs uppercase tracking-wide mb-2">Request</h4>
                <pre class="bg-slate-100 rounded-md p-3 text-xs text-slate-700 overflow-x-auto">{{ formatJson(entry.requestData) || '—' }}</pre>
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-xs uppercase tracking-wide mb-2">Response</h4>
                <pre class="bg-slate-100 rounded-md p-3 text-xs text-slate-700 overflow-x-auto">{{ formatJson(entry.responseData) || '—' }}</pre>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </DataTable>
</template>
