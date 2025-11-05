<script setup>

import DataTable from "../../../../../../components/dataTable/DataTable.vue";
import {useListScopesQuery} from "../../../../../../api/scopes.js";
import {useRoute} from "vue-router";
import DataTableColumn from "../../../../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../../../../components/dataTable/DataTableCell.vue";

const route = useRoute()

</script>

<template>
  <DataTable
    table-key="e699f79f-541b-4620-bdb5-561022c3a3cb"
    enable-search
    autofocus
    title="Scopes"
    :query-fn="(pagination) => useListScopesQuery(route.params.vsName, route.params.projectSlug, route.params.resourceServerId, pagination)"
  >
    <template #columns>
      <DataTableColumn title="Scope" field="scope" enable-order initial-order="asc"/>
      <DataTableColumn title="Name" field="name" enable-order/>
    </template>

    <template #row="{ item: socpe }">
      <DataTableCell>
        {{ scope.scope }}
      </DataTableCell>
      <DataTableCell>
        {{ scope.name }}
      </DataTableCell>
    </template>
  </DataTable>
</template>

<style scoped>

</style>