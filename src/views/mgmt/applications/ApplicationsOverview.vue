<script setup>

import {useRoute, useRouter} from "vue-router";
import { useListApplicationQuery} from "../../../api/applications.js";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import { ref} from "vue";
import { Plus } from "lucide-vue-next"
import ApplicationCreateModal from "./ApplicationCreateModal.vue";

const route = useRoute()
const router = useRouter()

const addAppModal = ref(null)

const onNavigateToAppDetails = async (app) => {
  await router.push(
      {
        name: 'mgmt-application-details',
        params: {
          vsName: route.params.vsName,
          appId: app.id,
        },
      },
  )
}

const onAddApplication = () => {
  addAppModal.value.open()
}

</script>

<template>
  <ApplicationCreateModal ref="addAppModal"/>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Applications"
          subtitle="Manage applications"
      >
        <KeylineButton text="Add" @click="onAddApplication">
          <template #adornment>
            <Plus/>
          </template>
        </KeylineButton>
      </PageHeader>
    </template>

    <DataTable
        table-key="74f7dc16-867c-4f6a-99fd-87b772d128ae"
        enable-search
        autofocus
        title="Applications"
        :queryFn="(pagination) => useListApplicationQuery(route.params.vsName, pagination)"
        :on-click="onNavigateToAppDetails"
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
  </PageLayout>
</template>

<style scoped>

</style>