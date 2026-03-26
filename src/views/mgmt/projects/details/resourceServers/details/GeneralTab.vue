<script setup>

import DataLayoutItem from "../../../../../../components/dataLayout/DataLayoutItem.vue";
import DataLayout from "../../../../../../components/dataLayout/DataLayout.vue";
import LoadingSkeleton from "../../../../../../components/LoadingSkeleton.vue";
import BoxContainer from "../../../../../../components/BoxContainer.vue";
import KeylineButton from "../../../../../../components/KeylineButton.vue";
import KeylineInput from "../../../../../../components/KeylineInput.vue";
import EditFormModal from "../../../../../../components/EditFormModal.vue";
import {useRoute} from "vue-router";
import {usePatchResourceServerMutation} from "../../../../../../api/resourceServers.js";
import {useFormModal} from "../../../../../../composables/formModal.js";
import {required} from "@vuelidate/validators";
import {toRef} from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const route = useRoute()

const patchResourceServer = usePatchResourceServerMutation(
    route.params.vsName,
    route.params.projectSlug,
    route.params.resourceServerId,
)

const edit = useFormModal({
  fields: {name: '', description: ''},
  rules: {name: {required}},
  onSubmit: (form) => patchResourceServer.mutateAsync({name: form.name, description: form.description}),
  toastMessages: {success: 'Resource server updated', error: 'Failed to update resource server'},
})
edit.syncFrom(toRef(props, 'data'))

</script>

<template>
  <EditFormModal :ref="(el) => edit.modalRef.value = el" title="Edit resource server" :vuelidate="edit.validation" @submit="edit.submit">
    <KeylineInput label="Name" v-model="edit.validation.name.$model" :vuelidate="edit.validation.name" required/>
    <KeylineInput label="Description" v-model="edit.form.description"/>
  </EditFormModal>

  <BoxContainer>
    <DataLayout title="Information">
      <template #actions>
        <KeylineButton @click="edit.open(data)" text="Edit" variant="secondary" size="sm"/>
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
