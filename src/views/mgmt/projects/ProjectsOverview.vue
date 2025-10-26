<script setup>

import {useRoute} from "vue-router";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import {useListProjectsQuery} from "../../../api/projects.js";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";

const route = useRoute()

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Projects"
          subtitle="Manage projects"
      />
    </template>

    <DataTable
        table-key="5196baf9-e74a-45bc-a8ec-533b64753dc4"
        enable-search
        autofocus
        title="Projects"
        :query-fn="(pagination) => useListProjectsQuery(route.params.vsName, pagination)"
    >
      <template #columns>
        <DataTableColumn title="Slug" field="slug"/>
        <DataTableColumn title="Name" field="name"/>
      </template>

      <template #row="{ item: project }">
        <DataTableCell>
          {{ project.slug }}
        </DataTableCell>
        <DataTableCell>
          {{ project.name }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>