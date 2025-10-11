<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import {useRoute} from "vue-router";
import {useListGroupsQuery} from "../../../api/groups.js";

const route = useRoute()

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Groups"
          subtitle="Manage groups"
      />
    </template>

    <DataTable
        table-key="e83afeed-d2fa-4c08-a965-6153086a355c"
        enable-search
        autofocus
        title="Groups"
        :query-fn="(pagination) => useListGroupsQuery(route.params.vsName, pagination)"
    >
      <template #columns>
        <DataTableColumn title="Name" field="name"/>
      </template>

      <template #row="{ item: group }">
        <DataTableCell>
          {{ group.name }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>