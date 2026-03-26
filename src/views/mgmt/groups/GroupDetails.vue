<script setup>

import {useRoute, useRouter} from "vue-router";
import {useGetGroupQuery, usePatchGroupMutation, useDeleteGroupMutation} from "../../../api/groups.js";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import BoxContainer from "../../../components/BoxContainer.vue";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import ModalPopup from "../../../components/ModalPopup.vue";
import KeylineForm from "../../../components/KeylineForm.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import DotMenu from "../../../components/DotMenu.vue";
import MenuItem from "../../../components/menu/MenuItem.vue";
import {useToast} from "../../../composables/toast.js";
import {usePopup} from "../../../composables/popup.js";
import {reactive, ref, watch} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const route = useRoute()
const router = useRouter()
const toast = useToast()
const popupService = usePopup()

const {data} = useGetGroupQuery(
    route.params.vsName,
    route.params.groupId,
)

const editModal = ref(null)
const editForm = reactive({name: '', description: ''})
const editRules = {name: {required}}
const editV$ = useVuelidate(editRules, editForm)

watch(data, (newData) => {
  if (newData) {
    editForm.name = newData.name || ''
    editForm.description = newData.description || ''
  }
})

const patchGroup = usePatchGroupMutation(route.params.vsName, route.params.groupId)
const deleteGroup = useDeleteGroupMutation(route.params.vsName)

const onEdit = () => {
  editV$.value.$reset()
  editModal.value.open()
}

const onEditSubmit = async () => {
  try {
    await patchGroup.mutateAsync({
      name: editForm.name,
      description: editForm.description,
    })
    toast.success('Group updated')
    editModal.value.close()
  } catch (e) {
    toast.error('Failed to update group')
  }
}

const onDelete = () => {
  popupService.confirm({
    title: 'Delete group',
    message: 'Are you sure you want to delete this group? This action cannot be undone.',
    onConfirm: async () => {
      try {
        await deleteGroup.mutateAsync(route.params.groupId)
        await router.push({name: 'mgmt-groups', params: {vsName: route.params.vsName}})
        toast.success('Group deleted')
      } catch (e) {
        toast.error('Failed to delete group')
      }
    }
  })
}

</script>

<template>
  <ModalPopup ref="editModal">
    <KeylineForm title="Edit group"
                 @submit="onEditSubmit"
                 :vuelidate="editV$"
    >
      <KeylineInput label="Name"
                    v-model="editV$.name.$model"
                    :vuelidate="editV$.name"
                    required
      />
      <KeylineInput label="Description"
                    v-model="editForm.description"
      />
    </KeylineForm>
  </ModalPopup>

  <PageLayout>
    <template #header>
      <PageHeader
          :title="data?.name"
          subtitle="Manage group configuration and settings"
      >
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
          <KeylineButton @click="onEdit" text="Edit" variant="secondary" size="sm"/>
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
