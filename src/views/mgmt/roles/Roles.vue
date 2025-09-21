<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import {useListRolesQuery} from "../../../api/roles.js";
import {useRoute, useRouter} from "vue-router";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";

const route = useRoute()
const router = useRouter()

const navigateToRoleDetails = (role) => {
  router.push({
    name: 'mgmt-role-details',
    params: {
      vsName: route.params.vsName,
      roleId: role.id,
    },
  })
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Roles"
          subtitle="Manage global roles"
      />
    </template>

    <DataTable
      enable-search
      autofocus
      title="Roles"
      :query-fn="(pagination) => {
        console.log('trying')
        return useListRolesQuery(route.params.vsName, pagination)
      }"
      :on-click="navigateToRoleDetails"
    >
      <template #columns>
        <DataTableColumn title="Name" field="name" enable-order/>
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