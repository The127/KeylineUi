<script setup>

import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import VerifiedBadge from "../../../components/VerifiedBadge.vue";
import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";
import BoxContainer from "../../../components/BoxContainer.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import EditFormModal from "../../../components/EditFormModal.vue";
import {useRoute} from "vue-router";
import {useListPasswordRulesQuery} from "../../../api/passwordRules.js";
import {usePatchVirtualServerMutation} from "../../../api/virtualServers.js";
import {useFormModal} from "../../../composables/formModal.js";
import NoContent from "../../../components/NoContent.vue";
import {required} from "@vuelidate/validators";
import {toRef} from "vue";

const route = useRoute()

const props = defineProps({
  data: {
    required: true,
  },
})

const {data: passwordRules} = useListPasswordRulesQuery(route.params.vsName)
const patchVS = usePatchVirtualServerMutation(route.params.vsName)

const edit = useFormModal({
  fields: {displayName: ''},
  rules: {displayName: {required}},
  onSubmit: (form) => patchVS.mutateAsync({displayName: form.displayName}),
  toastMessages: {success: 'Virtual server updated', error: 'Failed to update virtual server'},
})
edit.syncFrom(toRef(props, 'data'))

</script>

<template>
  <EditFormModal :ref="(el) => edit.modalRef.value = el" title="Edit virtual server" :vuelidate="edit.validation" @submit="edit.submit">
    <KeylineInput label="Display name" v-model="edit.validation.displayName.$model" :vuelidate="edit.validation.displayName" required/>
  </EditFormModal>

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
      <DataLayoutItem title="Display Name">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.displayName }}
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="Login and Registration">
      <DataLayoutItem title="Self Registration">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.registrationEnabled ? 'Enabled' : 'Disabled' }}
          <VerifiedBadge anti-tooltip="disabled" tooltip="enabled" :verified="data.registrationEnabled"/>
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Require 2FA">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.require2fa ? 'Required' : 'Not required' }}
          <VerifiedBadge anti-tooltip="not required" tooltip="required" :verified="data.require2fa"/>
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Require Email Verification">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.requireEmailVerification ? 'Required' : 'Not required' }}
          <VerifiedBadge anti-tooltip="not required" tooltip="required" :verified="data.requireEmailVerification"/>
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="Password policies">
      <DataLayoutItem title="Rules" full-row>
        <NoContent :cond="!passwordRules?.items?.length" message="No password policy rules configured.">
          <ul class="list-disc list-inside text-sm space-y-1">
            <li v-for="rule in passwordRules?.items" :key="rule.type">
              <span class="font-medium">{{ rule.type }}</span>: {{ rule.value }}
            </li>
          </ul>
        </NoContent>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>
</template>

<style scoped>

</style>
