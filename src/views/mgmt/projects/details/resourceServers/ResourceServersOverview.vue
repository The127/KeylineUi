<script setup>

import {useListResourceServersQuery} from "../../../../../api/resourceServers.js";
import DataTableColumn from "../../../../../components/dataTable/DataTableColumn.vue";
import DataTable from "../../../../../components/dataTable/DataTable.vue";
import DataTableCell from "../../../../../components/dataTable/DataTableCell.vue";
import {useRoute, useRouter} from "vue-router";
import PageLayout from "../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../components/PageHeader.vue";
import ResourceServerCreateModal from "./ResourceServerCreateModal.vue";
import {ref} from "vue";
import {Plus} from "lucide-vue-next";
import KeylineButton from "../../../../../components/KeylineButton.vue";

const route = useRoute()
const router = useRouter()

const addResourceServerModal = ref(null)

const onAddResourceServer = () => {
  addResourceServerModal.value.open()
}

const onNavigateToResourceServer = async (resourceServer) => {
  await router.push({
        name: 'mgmt-resource-server-details',
        params: {
          vsName: route.params.vsName,
          projectSlug: route.params.projectSlug,
          resourceServerId: resourceServer.id,
        },
      },
  )
}

</script>

<template>
  <ResourceServerCreateModal ref="addResourceServerModal"/>

  <PageLayout>
    <template #header>
      <PageHeader
          title="Resource Servers"
          subtitle="Manage resource servers"
      >
        <KeylineButton text="Add" @click="onAddResourceServer">
          <template #adornment>
            <Plus/>
          </template>
        </KeylineButton>
      </PageHeader>
    </template>

    <DataTable
        table-key="5664ab9f-b638-45b7-8548-813d4bf2c949"
        enable-search
        autofocus
        title="Resource Servers"
        :query-fn="(pagination) => useListResourceServersQuery(route.params.vsName, route.params.projectSlug, pagination)"
        :on-click="onNavigateToResourceServer"
    >
      <template #columns>
        <DataTableColumn title="Slug" field="slug" enable-order initial-order="asc"/>
        <DataTableColumn title="Name" field="name" enable-order/>
      </template>

      <template #row="{ item: resourceServer }">
        <DataTableCell>
          {{ resourceServer.slug }}
        </DataTableCell>
        <DataTableCell>
          {{ resourceServer.name }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>