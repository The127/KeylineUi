<script setup>

import {useRoute} from "vue-router";
import {useGetGroupQuery, usePatchGroupMutation, useDeleteGroupMutation} from "../../../api/groups.js";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import BoxContainer from "../../../components/BoxContainer.vue";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import EditFormModal from "../../../components/EditFormModal.vue";
import DotMenu from "../../../components/DotMenu.vue";
import MenuItem from "../../../components/menu/MenuItem.vue";
import {useFormModal} from "../../../composables/formModal.js";
import {useDeleteConfirm} from "../../../composables/deleteConfirm.js";
import {required} from "@vuelidate/validators";

const route = useRoute()
const deleteConfirm = useDeleteConfirm()

const {data} = useGetGroupQuery(route.params.vsName, route.params.groupId)

const patchGroup = usePatchGroupMutation(route.params.vsName, route.params.groupId)
const deleteGroup = useDeleteGroupMutation(route.params.vsName)

const edit = useFormModal({
  fields: {name: '', description: ''},
  rules: {name: {required}},
  onSubmit: (form) => patchGroup.mutateAsync({name: form.name, description: form.description}),
  toastMessages: {success: 'Group updated', error: 'Failed to update group'},
})
edit.syncFrom(data)

const onDelete = () => {
  deleteConfirm.confirm({
    title: 'Delete group',
    message: 'Are you sure you want to delete this group? This action cannot be undone.',
    mutation: deleteGroup,
    id: route.params.groupId,
    navigateTo: {name: 'mgmt-groups', params: {vsName: route.params.vsName}},
    successMessage: 'Group deleted',
    errorMessage: 'Failed to delete group',
  })
}

</script>

<template>
  <EditFormModal :ref="(el) => edit.modalRef.value = el" title="Edit group" :vuelidate="edit.v$" @submit="edit.submit">
    <KeylineInput label="Name" v-model="edit.v$.name.$model" :vuelidate="edit.v$.name" required/>
    <KeylineInput label="Description" v-model="edit.form.description"/>
  </EditFormModal>

  <PageLayout>
    <template #header>
      <PageHeader :title="data?.name" subtitle="Manage group configuration and settings">
        <template #actions>
          <DotMenu>
            <MenuItem variant="danger" text="Delete" @click="onDelete"/>
          </DotMenu>
        </template>
      </PageHeader>
    </template>

    <BoxContainer>
      <DataLayout title="Information">
        <template #actions>
          <KeylineButton @click="edit.open(data)" text="Edit" variant="secondary" size="sm"/>
        </template>

        <DataLayoutItem title="Name">
          <LoadingSkeleton :dep="data" class="w-32 h-4">
            {{ data.name }}
          </LoadingSkeleton>
        </DataLayoutItem>
        <DataLayoutItem title="Description" full-row>
          <LoadingSkeleton :dep="data" class="w-32 h-4">
            {{ data.description }}
          </LoadingSkeleton>
        </DataLayoutItem>
      </DataLayout>
    </BoxContainer>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>

<style scoped>

</style>
