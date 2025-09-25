<script setup>

import {useRoute} from "vue-router";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import {useListTemplatesQuery} from "../../../api/templates.js";

const route = useRoute()


</script>

<template>
  <DataTable
      autofocus
      title="Templates"
      :query-fn="(pagination) => useListTemplatesQuery(route.params.vsName, pagination)"
  >
    <template #columns>
      <DataTableColumn title="Type" field="type" enable-order/>
    </template>

    <template #row="{ item: template }">
      <DataTableCell>
        {{ template.type }}
      </DataTableCell>
    </template>
  </DataTable>
</template>

<style scoped>

</style>