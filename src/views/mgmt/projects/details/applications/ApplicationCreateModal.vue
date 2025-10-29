<script setup>

import KeylineForm from "../../../../../components/KeylineForm.vue";
import RadioButton from "../../../../../components/radio/RadioButton.vue";
import ListInput from "../../../../../components/ListInput.vue";
import FormGroup from "../../../../../components/FormGroup.vue";
import RadioButtonGroup from "../../../../../components/radio/RadioButtonGroup.vue";
import KeylineInput from "../../../../../components/KeylineInput.vue";
import {defineExpose, reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useCreateApplicationMutation} from "../../../../../api/applications.js";
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

const formModel = reactive({
  name: '',
  displayName: '',
  redirectUris: [],
  type: 'public',
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