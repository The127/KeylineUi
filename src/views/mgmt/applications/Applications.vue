<script setup>

import {useRoute} from "vue-router";
import {useProfileQuery} from "../../../api/user.js";
import {useListApplicationQuery} from "../../../api/applications.js";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";

const route = useRoute()

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
        :query="() => useListApplicationQuery(route.params.vsName)"
        v-slot="{ item: app }"
    >
      <DataTableColumn title="Name">
        {{ app.name }}
      </DataTableColumn>
      <DataTableColumn title="Display Name">
        {{ app.displayName }}
      </DataTableColumn>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>