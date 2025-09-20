<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import {useListRolesQuery} from "../../../api/roles.js";
import {useRoute, useRouter} from "vue-router";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";

const route = useRoute()

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Administration"
          subtitle="Manage this instance of keyline"
      />
    </template>

    TODO
  </PageLayout>
</template>

<style scoped>

</style>