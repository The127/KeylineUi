<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import {useRoute} from "vue-router";
import {useGetProjectQuery} from "../../../../api/projects.js";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import BoxContainer from "../../../../components/BoxContainer.vue";
import DataLayout from "../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../components/LoadingSkeleton.vue";
import TabLayout from "../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../components/tabs/TabPage.vue";
import DataTable from "../../../../components/dataTable/DataTable.vue";
import {useListApplicationQuery} from "../../../../api/applications.js";
import DataTableColumn from "../../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../../components/dataTable/DataTableCell.vue";
import {useListResourceServersQuery} from "../../../../api/resourceServers.js";

const route = useRoute()

const {data} = useGetProjectQuery(
    route.params.vsName,
    route.params.projectSlug,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="data?.name"
          subtitle="Manage project resources, configuration and settings"
      />
    </template>

    <TabLayout>
      <TabPage title="General" name="general">
        <BoxContainer>
          <DataLayout title="Information">
            <DataLayoutItem title="Name">
              <LoadingSkeleton :dep="data" class="w-32 h4">
                {{ data.name }}
              </LoadingSkeleton>
            </DataLayoutItem>
            <DataLayoutItem title="Slug">
              <LoadingSkeleton :dep="data" class="w-32 h4">
                {{ data.slug }}
              </LoadingSkeleton>
            </DataLayoutItem>
            <DataLayoutItem title="Description" full-row>
              <LoadingSkeleton :dep="data" class="w-full h4">
                {{ data.description }}
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>
      </TabPage>

      <TabPage title="Applications" name="application">
        <DataTable
            table-key="42f42cdc-9b3c-4eab-a7a1-15d31f21187e"
            enable-search
            autofocus
            title="Applications"
            :queryFn="(pagination) => useListApplicationQuery(route.params.vsName, route.params.projectSlug, pagination)"
        >
          <template #columns>
            <DataTableColumn title="Name" field="name" enable-order initial-order="asc"/>
            <DataTableColumn title="Display Name" field="display_name" enable-order/>
            <DataTableColumn title="Namespace" field="system_application" enable-order/>
          </template>

          <template #row="{ item: app }">
            <DataTableCell>
              {{ app.name }}
            </DataTableCell>
            <DataTableCell>
              {{ app.displayName }}
            </DataTableCell>
            <DataTableCell>
              {{ app.systemApplication ? 'System' : 'User' }}
            </DataTableCell>
          </template>
        </DataTable>
      </TabPage>

      <TabPage title="Resource Servers" name="resource-servers">
        <DataTable
            table-key="5664ab9f-b638-45b7-8548-813d4bf2c949"
            enable-search
            autofocus
            title="Resource Servers"
            :query-fn="(pagination) => useListResourceServersQuery(route.params.vsname, route.params.projectSlug, queryOps)"
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