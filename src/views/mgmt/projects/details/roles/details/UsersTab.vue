<script setup>

import {computed, ref} from 'vue'
import {useRoute} from 'vue-router'
import DataTable from '../../../../../../components/dataTable/DataTable.vue'
import DataTableColumn from '../../../../../../components/dataTable/DataTableColumn.vue'
import DataTableCell from '../../../../../../components/dataTable/DataTableCell.vue'
import KeylineButton from '../../../../../../components/KeylineButton.vue'
import KeylineInput from '../../../../../../components/KeylineInput.vue'
import ModalPopup from '../../../../../../components/ModalPopup.vue'
import {useListUsersInRoleQuery, useAssignRoleMutation} from '../../../../../../api/roles.js'
import {useListUsersQuery} from '../../../../../../api/user.js'
import {useToast} from '../../../../../../composables/toast.js'
import {Plus} from 'lucide-vue-next'

const route = useRoute()
const toast = useToast()

const assignModal = ref(null)
const searchTerm = ref('')
const selectedUser = ref(null)

const userSearchOps = computed(() => ({search: searchTerm.value, pageSize: 10}))
const {data: searchResults} = useListUsersQuery(route.params.vsName, userSearchOps)

const assignRole = useAssignRoleMutation(
  route.params.vsName,
  route.params.projectSlug,
  route.params.roleId,
)

const onOpenAssign = () => {
  searchTerm.value = ''
  selectedUser.value = null
  assignModal.value.open()
}

const onAssign = async () => {
  if (!selectedUser.value) return
  try {
    await assignRole.mutateAsync({userId: selectedUser.value.id})
    toast.success('User assigned to role')
    assignModal.value.close()
  } catch {
    toast.error('Failed to assign user')
  }
}

</script>

<template>
  <ModalPopup ref="assignModal">
    <div class="p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Assign user to role</h2>

      <KeylineInput
        label="Search users"
        v-model="searchTerm"
        autofocus
        placeholder="Type to search..."
      />

      <div class="mt-3 border rounded-md divide-y max-h-60 overflow-y-auto">
        <div
          v-if="!searchResults?.items?.length"
          class="px-3 py-2 text-sm text-slate-400"
        >
          No users found
        </div>
        <button
          v-for="user in searchResults?.items"
          :key="user.id"
          type="button"
          class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2"
          :class="selectedUser?.id === user.id ? 'bg-emerald-50 text-emerald-700 font-medium' : ''"
          @click="selectedUser = user"
        >
          <span class="font-medium">{{ user.username }}</span>
          <span v-if="user.displayName" class="text-slate-400">{{ user.displayName }}</span>
        </button>
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <KeylineButton text="Cancel" variant="secondary" @click="assignModal.close()"/>
        <KeylineButton
          text="Assign"
          :disabled="!selectedUser"
          @click="onAssign"
        />
      </div>
    </div>
  </ModalPopup>

  <div class="flex justify-end mb-3">
    <KeylineButton text="Assign user" size="sm" @click="onOpenAssign">
      <template #adornment>
        <Plus/>
      </template>
    </KeylineButton>
  </div>

  <DataTable
    table-key="a1f3c8e2-9b47-4d6a-bc21-7e0f85d23c91"
    enable-search
    title="Assigned users"
    :queryFn="(pagination) => useListUsersInRoleQuery(route.params.vsName, route.params.projectSlug, route.params.roleId, pagination)"
  >
    <template #columns>
      <DataTableColumn title="Username" field="username" enable-order/>
      <DataTableColumn title="Display name" field="display_name" enable-order/>
    </template>

    <template #row="{ item: user }">
      <DataTableCell>{{ user.username }}</DataTableCell>
      <DataTableCell>{{ user.displayName }}</DataTableCell>
    </template>
  </DataTable>
</template>
