<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import {useListRolesQuery} from "../../../api/roles.js";
import {useRoute, useRouter} from "vue-router";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import GridLayout from "../../../components/GridLayout.vue";
import DashboardItem from "../../../components/DashboardItem.vue";
import Tabs from "../../../components/tabs/Tabs.vue";
import Tab from "../../../components/tabs/Tab.vue";

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

    <Tabs>
      <Tab title="General">
        TODO: general tab
      </Tab>
      <Tab title="Email">
        TODO: email tab
      </Tab>
      <Tab title="Templates">
        TODO: templates tab
      </Tab>
    </Tabs>
  </PageLayout>
</template>

<style scoped>

</style>