<script setup>

import {useRoute} from "vue-router";
import {useGetRoleQuery, usePatchRoleMutation, useDeleteRoleMutation} from "../../../../../../api/roles.js";
import PageLayout from "../../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../../components/PageHeader.vue";
import BoxContainer from "../../../../../../components/BoxContainer.vue";
import DataLayout from "../../../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../../../components/LoadingSkeleton.vue";
import ModelMetadata from "../../../../../../components/ModelMetadata.vue";
import KeylineButton from "../../../../../../components/KeylineButton.vue";
import KeylineInput from "../../../../../../components/KeylineInput.vue";
import EditFormModal from "../../../../../../components/EditFormModal.vue";
import DotMenu from "../../../../../../components/DotMenu.vue";
import MenuItem from "../../../../../../components/menu/MenuItem.vue";
import TabLayout from "../../../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../../../components/tabs/TabPage.vue";
import UsersTab from "./UsersTab.vue";
import {useFormModal} from "../../../../../../composables/formModal.js";
import {useDeleteConfirm} from "../../../../../../composables/deleteConfirm.js";
import {required} from "@vuelidate/validators";

const route = useRoute()
const deleteConfirm = useDeleteConfirm()

const {data} = useGetRoleQuery(route.params.vsName, route.params.projectSlug, route.params.roleId)

const patchRole = usePatchRoleMutation(route.params.vsName, route.params.projectSlug, route.params.roleId)
const deleteRole = useDeleteRoleMutation(route.params.vsName, route.params.projectSlug)

const edit = useFormModal({
  fields: {name: '', description: ''},
  rules: {name: {required}},
  onSubmit: (form) => patchRole.mutateAsync({name: form.name, description: form.description}),
  toastMessages: {success: 'Role updated', error: 'Failed to update role'},
})
const editModalRef = edit.modalRef
edit.syncFrom(data)

const onDelete = () => {
  deleteConfirm.confirm({
    title: 'Delete role',
    message: 'Are you sure you want to delete this role? This action cannot be undone.',
    mutation: deleteRole,
    id: route.params.roleId,
    navigateTo: {name: 'mgmt-roles-overview', params: {vsName: route.params.vsName, projectSlug: route.params.projectSlug}},
    successMessage: 'Role deleted',
    errorMessage: 'Failed to delete role',
  })
}

</script>

<template>
  <EditFormModal ref="editModalRef" title="Edit role" :vuelidate="edit.validation" @submit="edit.submit">
    <KeylineInput label="Name" v-model="edit.validation.name.$model" :vuelidate="edit.validation.name" required/>
    <KeylineInput label="Description" v-model="edit.form.description"/>
  </EditFormModal>

  <PageLayout>
    <template #header>
      <PageHeader :title="data?.name" subtitle="Manage role configuration and settings">
        <DotMenu>
          <MenuItem variant="danger" text="Delete" @click="onDelete"/>
        </DotMenu>
      </PageHeader>
    </template>

    <TabLayout>
      <TabPage title="Information" name="information">
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
      </TabPage>

      <TabPage title="Users" name="users">
        <UsersTab/>
      </TabPage>
    </TabLayout>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>

<style scoped>

</style>
