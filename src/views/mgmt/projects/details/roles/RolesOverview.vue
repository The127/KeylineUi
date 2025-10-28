<script setup>

import PageLayout from "../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../components/PageHeader.vue";
import {useListRolesQuery} from "../../../../../api/roles.js";
import DataTable from "../../../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../../../components/dataTable/DataTableCell.vue";
import {useRoute} from "vue-router";

const route = useRoute()

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Roles"
          subtitle="Manage roles"
      />
    </template>

    <DataTable
        table-key="e8247fec-cd98-4447-9bcf-89211558abac"
        enable-search
        autofocus
        title="Roles"
        :queryFn="(pagination) => useListRolesQuery(route.params.vsName, route.params.projectSlug, pagination)"
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