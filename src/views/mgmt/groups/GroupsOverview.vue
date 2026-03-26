<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import ModalPopup from "../../../components/ModalPopup.vue";
import KeylineForm from "../../../components/KeylineForm.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import {useRoute, useRouter} from "vue-router";
import {useListGroupsQuery, useCreateGroupMutation} from "../../../api/groups.js";
import {useToast} from "../../../composables/toast.js";
import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const route = useRoute()
const router = useRouter()
const toast = useToast()

const createModal = ref(null)
const createForm = reactive({name: '', description: ''})
const createRules = {name: {required}}
const createV$ = useVuelidate(createRules, createForm)

const createGroup = useCreateGroupMutation(route.params.vsName)

const onAdd = () => {
  createForm.name = ''
  createForm.description = ''
  createV$.value.$reset()
  createModal.value.open()
}

const onCreateSubmit = async () => {
  try {
    await createGroup.mutateAsync({
      name: createForm.name,
      description: createForm.description,
    })
    toast.success('Group created')
    createModal.value.close()
  } catch (e) {
    toast.error('Failed to create group')
  }
}

const onRowClick = (group) => {
  router.push({name: 'mgmt-group-details', params: {vsName: route.params.vsName, groupId: group.id}})
}

</script>

<template>
  <ModalPopup ref="createModal">
    <KeylineForm title="Create group"
                 @submit="onCreateSubmit"
                 :vuelidate="createV$"
    >
      <KeylineInput label="Name"
                    v-model="createV$.name.$model"
                    :vuelidate="createV$.name"
                    required
      />
      <KeylineInput label="Description"
                    v-model="createForm.description"
      />
    </KeylineForm>
  </ModalPopup>

  <PageLayout>
    <template #header>
      <PageHeader
          title="Groups"
          subtitle="Manage groups"
      >
        <template #actions>
          <KeylineButton @click="onAdd" text="Add" variant="primary" size="sm"/>
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
