<script setup>

import {useListResourceServersQuery} from "../../../../../api/resourceServers.js";
import DataTableColumn from "../../../../../components/dataTable/DataTableColumn.vue";
import DataTable from "../../../../../components/dataTable/DataTable.vue";
import DataTableCell from "../../../../../components/dataTable/DataTableCell.vue";
import {useRoute} from "vue-router";
import PageLayout from "../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../components/PageHeader.vue";

const route = useRoute()

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Resource Servers"
          subtitle="Manage resource servers"
      />
    </template>

    <DataTable
        table-key="5664ab9f-b638-45b7-8548-813d4bf2c949"
        enable-search
        autofocus
        title="Resource Servers"
        :query-fn="(pagination) => useListResourceServersQuery(route.params.vsName, route.params.projectSlug, pagination)"
    >
      <template #columns>
        <DataTableColumn title="Name" field="name" enable-order initial-order="asc"/>
      </template>

      <template #row="{ item: resourceServer }">
        <DataTableCell>
          {{ resourceServer.name }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>