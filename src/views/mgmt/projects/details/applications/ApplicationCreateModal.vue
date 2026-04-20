<script setup>

import KeylineForm from "../../../../../components/KeylineForm.vue";
import RadioButton from "../../../../../components/radio/RadioButton.vue";
import ListInput from "../../../../../components/ListInput.vue";
import FormGroup from "../../../../../components/FormGroup.vue";
import RadioButtonGroup from "../../../../../components/radio/RadioButtonGroup.vue";
import KeylineInput from "../../../../../components/KeylineInput.vue";
import {computed, defineExpose, reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useCreateApplicationMutation} from "../../../../../api/applications.js";
import {useGetVirtualServerQuery} from "../../../../../api/virtualServers.js";
import {useRoute} from "vue-router";
import {useToast} from "../../../../../composables/toast.js";
import SpecialText from "../../../../../components/SpecialText.vue";
import ModalPopup from "../../../../../components/ModalPopup.vue";
import HeadingText from "../../../../../components/HeadingText.vue";
import KeylineButton from "../../../../../components/KeylineButton.vue";

const route = useRoute()
const toast = useToast()

const addAppModal = ref(null)

const secret = ref('')

const {data: vsData} = useGetVirtualServerQuery(route.params.vsName)

const availableSigningAlgorithms = computed(() => {
  if (!vsData.value) return []
  return [vsData.value.primarySigningAlgorithm, ...(vsData.value.additionalSigningAlgorithms ?? [])]
})

const formModel = reactive({
  name: '',
  displayName: '',
  redirectUris: [],
  type: 'public',
  signingAlgorithm: null,
})

const formRules = {
  name: { required, },
  displayName: { required, },
  redirectUris: { required, },
  type: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  formModel.name = ''
  formModel.displayName = ''
  formModel.redirectUris = []
  formModel.type = 'public'
  formModel.signingAlgorithm = null

  v$.value.$reset()

  addAppModal.value.open()
}

const createApplicationMutation = useCreateApplicationMutation(
    route.params.vsName,
    route.params.projectSlug,
)

const createApplication = async () => {
  try{
    const createResponse = await createApplicationMutation.mutateAsync({
      name: formModel.name,
      displayName: formModel.displayName,
      type: formModel.type,
      redirectUris: formModel.redirectUris,
      ...(formModel.signingAlgorithm ? {signingAlgorithm: formModel.signingAlgorithm} : {}),
    })

    if (formModel.type === 'confidential') {
      secret.value = createResponse.secret
      return
    }

    toast.success('Application created')
  } catch (e) {
    console.error(e)
    toast.error('Failed to create application')
  }

  addAppModal.value.close()
}

defineExpose({
  open,
});

</script>

<template>
  <ModalPopup ref="addAppModal" title="Add application">
    <KeylineForm
        title="Add application"
        @submit="createApplication"
        :vuelidate="v$"
        submit-text="Create application"
        v-if="!secret"
    >
      <KeylineInput label="Name"
             v-model="v$.name.$model"
             :vuelidate="v$.name"
             required
             helper-text="The name of the application. Must be unique."
      />
      <KeylineInput label="Display Name"
             v-model="v$.displayName.$model"
             :vuelidate="v$.displayName"
             required
             helper-text="The display name of the application. Will be shown to the user."
      />
      <FormGroup title="Application type">
        <RadioButtonGroup
            name="appType"
            v-model="v$.type.$model"
        >
          <RadioButton
              value="public"
              label="Public"
              helper-text="Use for SPAs and mobile Apps."
          />
          <RadioButton
              value="confidential"
              label="Confidential"
              helper-text="Use for server side applications."
          />
        </RadioButtonGroup>
      </FormGroup>
      <FormGroup title="Redirect URIs">
        <ListInput
            label="Redirect URI"
            v-model="v$.redirectUris.$model"
            helper-text="The redirect URIs of the application. Must be unique."
        />
      </FormGroup>
      <FormGroup title="Signing Algorithm" v-if="availableSigningAlgorithms.length > 1">
        <div class="flex flex-col gap-1">
          <select
              v-model="formModel.signingAlgorithm"
              class="border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800"
          >
            <option :value="null">Default (VS primary)</option>
            <option v-for="alg in availableSigningAlgorithms" :key="alg" :value="alg">{{ alg }}</option>
          </select>
          <p class="text-xs text-slate-500">Override the VS primary algorithm for tokens issued to this application.</p>
        </div>
      </FormGroup>
    </KeylineForm>
    <div v-else class="flex flex-col gap-5">
      <HeadingText level="h3">Application Secret</HeadingText>
      <span>
        Please make sure to save the secret securely. The secret will not be shown again. You can regenerate the secret at any time.
      </span>
      <SpecialText>
        {{ secret }}
      </SpecialText>
      <KeylineButton text="I have stored the secret" @click="addAppModal.close()"/>
    </div>
  </ModalPopup>
</template>

<style scoped>

</style>