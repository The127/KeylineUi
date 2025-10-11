<script setup>

import {useRoute} from "vue-router";
import {useGetRoleQuery, useListUsersInRoleQuey} from "../../../../api/roles.js";
import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import TabLayout from "../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../components/tabs/TabPage.vue";
import GeneralTab from "./GeneralTab.vue";
import DataTableCell from "../../../../components/dataTable/DataTableCell.vue";
import DataTable from "../../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../../components/dataTable/DataTableColumn.vue";

const route = useRoute()

const { data } = useGetRoleQuery(
    route.params.vsName,
    route.params.roleId,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
        :title="data?.name"
        subtitle="Manage role configuration and settings"
      />
    </template>

    <TabLayout>
      <TabPage title="General" name="general">
        <GeneralTab :data="data"/>
      </TabPage>
      <TabPage title="Users" name="users">
        <DataTable
            title="Users in role"
            :queryFn="(pagination) => useListUsersInRoleQuey(route.params.vsName, route.params.roleId, pagination)"
        >
          <template #columns>
            <DataTableColumn title="Username" field="username"/>
            <DataTableColumn title="Display Name" field="displayName"/>
          </template>

          <template #row="{ item: user }">
            <DataTableCell>
              {{ user.username }}
            </DataTableCell>
            <DataTableCell>
              {{ user.displayName }}
            </DataTableCell>
          </template>
        </DataTable>
      </TabPage>
    </TabLayout>

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>