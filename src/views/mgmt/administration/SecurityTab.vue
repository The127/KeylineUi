<script setup>

import BoxContainer from "../../../components/BoxContainer.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import EditFormModal from "../../../components/EditFormModal.vue";
import {usePatchVirtualServerMutation} from "../../../api/virtualServers.js";
import {useFormModal} from "../../../composables/formModal.js";
import {useRoute} from "vue-router";
import {toRef} from "vue";

const route = useRoute()

const props = defineProps({
  data: {
    required: true,
  },
})

const patchVS = usePatchVirtualServerMutation(route.params.vsName)

const availableAlgorithms = ['EdDSA', 'RS256']

const signingEdit = useFormModal({
  fields: {primarySigningAlgorithm: 'EdDSA', additionalSigningAlgorithms: []},
  rules: {},
  onSubmit: (form) => patchVS.mutateAsync({
    primarySigningAlgorithm: form.primarySigningAlgorithm,
    additionalSigningAlgorithms: form.additionalSigningAlgorithms,
  }),
  toastMessages: {success: 'Signing algorithms updated', error: 'Failed to update signing algorithms'},
})
const signingEditModalRef = signingEdit.modalRef
signingEdit.syncFrom(toRef(props, 'data'))

const additionalAlgorithms = (algs) => algs && algs.length > 0 ? algs.join(', ') : '—'

</script>

<template>
  <EditFormModal ref="signingEditModalRef" title="Edit signing algorithms" @submit="signingEdit.submit">
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Primary algorithm</label>
      <select
          v-model="signingEdit.form.primarySigningAlgorithm"
          class="border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800"
      >
        <option v-for="alg in availableAlgorithms" :key="alg" :value="alg">{{ alg }}</option>
      </select>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium">Additional algorithms</label>
      <div class="flex flex-col gap-1">
        <label
            v-for="alg in availableAlgorithms"
            :key="alg"
            class="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
              type="checkbox"
              :value="alg"
              v-model="signingEdit.form.additionalSigningAlgorithms"
              class="rounded"
          />
          {{ alg }}
        </label>
      </div>
      <p class="text-xs text-slate-500">Additional algorithms expose extra keys in the JWKS and can be assigned to individual applications.</p>
    </div>
  </EditFormModal>

  <BoxContainer>
    <DataLayout title="Signing keys">
      <template #actions>
        <KeylineButton @click="signingEdit.open(data)" text="Edit" variant="secondary" size="sm"/>
      </template>
      <DataLayoutItem title="Primary Algorithm">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.primarySigningAlgorithm }}
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Additional Algorithms">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ additionalAlgorithms(data.additionalSigningAlgorithms) }}
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>
</template>

<style scoped>

</style>
