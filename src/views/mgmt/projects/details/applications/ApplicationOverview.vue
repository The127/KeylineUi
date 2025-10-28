<script setup>

import PageLayout from "../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../components/PageHeader.vue";
import {useListApplicationQuery} from "../../../../../api/applications.js";
import DataTable from "../../../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../../../components/dataTable/DataTableCell.vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()

const router = useRouter()

const onNavigateToApplication = async (app) => {
  await router.push(
      {
        name: 'mgmt-application-details',
        params: {
          vsName: route.params.vsName,
          projectSlug: route.params.projectSlug,
          appId: app.id,
        },
      },
  )
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Applications"
          subtitle="Manage applications"
      />
    </template>


    <DataTable
        table-key="42f42cdc-9b3c-4eab-a7a1-15d31f21187e"
        enable-search
        autofocus
        title="Applications"
        :queryFn="(pagination) => useListApplicationQuery(route.params.vsName, route.params.projectSlug, pagination)"
        :on-click="onNavigateToApplication"
    >
      <template #columns>
        <DataTableColumn title="Name" field="name" enable-order initial-order="asc"/>
        <DataTableColumn title="Display Name" field="display_name" enable-order/>
        <DataTableColumn title="Namespace" field="system_application" enable-order/>
      </template>

      <template #row="{ item: app }">
        <DataTableCell>
          {{ app.name }}
        </DataTableCell>
        <DataTableCell>
          {{ app.displayName }}
        </DataTableCell>
        <DataTableCell>
          {{ app.systemApplication ? 'System' : 'User' }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>