<script setup>

import {useRoute, useRouter} from "vue-router";
import {useListApplicationQuery} from "../../../api/applications.js";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import Button from "../../../components/Button.vue";
import Modal from "../../../components/Modal.vue";
import {ref} from "vue";
import Form from "../../../components/Form.vue";

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
  <Modal ref="addAppModal" title="Add application">
    <Form title="Add application">
      TODO: Add application form
    </Form>
  </Modal>

  <PageLayout>
    <template #header>
      <PageHeader
          title="Applications"
          subtitle="Manage applications"
      >
        <Button text="Add" @click="onAddApplication"/>
      </PageHeader>
    </template>

    <DataTable
        :queryFn="(pagination) => useListApplicationQuery(route.params.vsName, pagination)"
        :on-click="onNavigateToAppDetails"
    >
      <template #columns>
        <DataTableColumn title="Name" field="name"/>
        <DataTableColumn title="Display Name" field="displayName"/>
      </template>

      <template #row="{ item: app }">
        <DataTableCell>
          {{ app.name }}
        </DataTableCell>
        <DataTableCell>
          {{ app.displayName }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>