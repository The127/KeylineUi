<script setup>

import DataLayoutItem from "../../../../../../components/dataLayout/DataLayoutItem.vue";
import DataLayout from "../../../../../../components/dataLayout/DataLayout.vue";
import LoadingSkeleton from "../../../../../../components/LoadingSkeleton.vue";
import BoxContainer from "../../../../../../components/BoxContainer.vue";
import KeylineButton from "../../../../../../components/KeylineButton.vue";
import ModalPopup from "../../../../../../components/ModalPopup.vue";
import KeylineForm from "../../../../../../components/KeylineForm.vue";
import KeylineInput from "../../../../../../components/KeylineInput.vue";
import {useRoute} from "vue-router";
import {usePatchResourceServerMutation} from "../../../../../../api/resourceServers.js";
import {useToast} from "../../../../../../composables/toast.js";
import {reactive, ref, watch} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const toast = useToast()

const editModal = ref(null)
const editForm = reactive({name: '', description: ''})
const editRules = {name: {required}}
const editV$ = useVuelidate(editRules, editForm)

watch(() => props.data, (newData) => {
  if (newData) {
    editForm.name = newData.name || ''
    editForm.description = newData.description || ''
  }
})

const patchResourceServer = usePatchResourceServerMutation(
    route.params.vsName,
    route.params.projectSlug,
    route.params.resourceServerId,
)

const onEdit = () => {
  editV$.value.$reset()
  editModal.value.open()
}

const onEditSubmit = async () => {
  try {
    await patchResourceServer.mutateAsync({
      name: editForm.name,
      description: editForm.description,
    })
    toast.success('Resource server updated')
    editModal.value.close()
  } catch (e) {
    toast.error('Failed to update resource server')
  }
}

</script>

<template>
  <ModalPopup ref="editModal">
    <KeylineForm title="Edit resource server"
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

  <BoxContainer>
    <DataLayout title="Information">
      <template #actions>
        <KeylineButton @click="onEdit" text="Edit" variant="secondary" size="sm"/>
      </template>

      <DataLayoutItem title="Slug">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.slug }}
        </LoadingSkeleton>
      </DataLayoutItem>
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
</template>

<style scoped>

</style>
