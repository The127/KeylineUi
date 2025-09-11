<script setup>

import {useListApplicationQuery} from "../../../api/applications.js";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import Button from "../../../components/Button.vue";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import {useListUsersQuery} from "../../../api/user.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const onNavigateToUserDetails = async (user) => {
  await router.push({
    name: 'mgmt-user-details',
    params: {
      vsName: route.params.vsName,
      userId: user.id,
    },
  })
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Users"
          subtitle="Manage users"
      >
      </PageHeader>
    </template>

    <DataTable
        enable-search
        autofocus
        title="Users"
        :queryFn="(pagination) => useListUsersQuery(route.params.vsName, pagination)"
        :on-click="onNavigateToUserDetails"
    >
      <template #columns>
        <DataTableColumn title="Username" field="username" enable-order initial-order="asc"/>
        <DataTableColumn title="Display Name" field="display_name" enable-order/>
        <DataTableColumn title="Email" field="primary_email" enable-order/>
      </template>

      <template #row="{ item: app }">
        <DataTableCell>
          {{ app.username }}
        </DataTableCell>
        <DataTableCell>
          {{ app.displayName }}
        </DataTableCell>
        <DataTableCell>
          {{ app.primaryEmail }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>