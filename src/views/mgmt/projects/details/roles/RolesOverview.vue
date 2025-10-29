<script setup>

import PageLayout from "../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../components/PageHeader.vue";
import {useListRolesQuery} from "../../../../../api/roles.js";
import DataTable from "../../../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../../../components/dataTable/DataTableCell.vue";
import {useRoute, useRouter} from "vue-router";
import {Plus} from "lucide-vue-next";
import KeylineButton from "../../../../../components/KeylineButton.vue";
import {ref} from "vue";
import RoleCreateModal from "./RoleCreateModal.vue";

const route = useRoute()
const router = useRouter()

const addRoleModal = ref(null)

const onAddRole = () => {
  addRoleModal.value.open()
}

const onNavigateToRole = async (role) => {
  await router.push({
        name: 'mgmt-role-details',
        params: {
          vsName: route.params.vsName,
          projectSlug: route.params.projectSlug,
          roleId: role.id,
        }
      },
  )
}

</script>

<template>
  <RoleCreateModal ref="addRoleModal"/>

  <PageLayout>
    <template #header>
      <PageHeader
          title="Roles"
          subtitle="Manage roles"
      >
        <KeylineButton text="Add" @click="onAddRole">
          <template #adornment>
            <Plus/>
          </template>
        </KeylineButton>
      </PageHeader>
    </template>

    <DataTable
        table-key="e8247fec-cd98-4447-9bcf-89211558abac"
        enable-search
        autofocus
        title="Roles"
        :queryFn="(pagination) => useListRolesQuery(route.params.vsName, route.params.projectSlug, pagination)"
        :on-click="onNavigateToRole"
    >
      <template #columns>
        <DataTableColumn title="Name" field="name"/>
      </template>

      <template #row="{ item: role }">
        <DataTableCell>
          {{ role.name }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>