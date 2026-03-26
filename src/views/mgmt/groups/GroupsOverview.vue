<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import EditFormModal from "../../../components/EditFormModal.vue";
import {useRoute, useRouter} from "vue-router";
import {useListGroupsQuery, useCreateGroupMutation} from "../../../api/groups.js";
import {useFormModal} from "../../../composables/formModal.js";
import {required} from "@vuelidate/validators";

const route = useRoute()
const router = useRouter()

const createGroup = useCreateGroupMutation(route.params.vsName)

const create = useFormModal({
  fields: {name: '', description: ''},
  rules: {name: {required}},
  onSubmit: (form) => createGroup.mutateAsync({name: form.name, description: form.description}),
  toastMessages: {success: 'Group created', error: 'Failed to create group'},
})

const onRowClick = (group) => {
  router.push({name: 'mgmt-group-details', params: {vsName: route.params.vsName, groupId: group.id}})
}

</script>

<template>
  <EditFormModal :ref="(el) => create.modalRef.value = el" title="Create group" :vuelidate="create.validation" @submit="create.submit">
    <KeylineInput label="Name" v-model="create.validation.name.$model" :vuelidate="create.validation.name" required/>
    <KeylineInput label="Description" v-model="create.form.description"/>
  </EditFormModal>

  <PageLayout>
    <template #header>
      <PageHeader title="Groups" subtitle="Manage groups">
        <template #actions>
          <KeylineButton @click="create.open()" text="Add" variant="primary" size="sm"/>
        </template>
      </PageHeader>
    </template>

    <DataTable
        table-key="e83afeed-d2fa-4c08-a965-6153086a355c"
        enable-search
        autofocus
        title="Groups"
        :query-fn="(pagination) => useListGroupsQuery(route.params.vsName, pagination)"
        :on-click="onRowClick"
    >
      <template #columns>
        <DataTableColumn title="Name" field="name"/>
      </template>

      <template #row="{ item: group }">
        <DataTableCell>
          {{ group.name }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>
