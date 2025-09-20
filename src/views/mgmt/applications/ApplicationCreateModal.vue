<script setup>

import Form from "../../../components/Form.vue";
import RadioButton from "../../../components/radio/RadioButton.vue";
import Modal from "../../../components/Modal.vue";
import ListInput from "../../../components/ListInput.vue";
import FormGroup from "../../../components/FormGroup.vue";
import RadioButtonGroup from "../../../components/radio/RadioButtonGroup.vue";
import Input from "../../../components/Input.vue";
import {defineExpose, reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useCreateApplicationMutation} from "../../../api/applications.js";
import {useRoute} from "vue-router";
import {useToast} from "../../../composables/toast.js";

const route = useRoute()
const toast = useToast()

const addAppModal = ref(null)

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

const createApplicationMutation = useCreateApplicationMutation(route.params.vsName)

const createApplication = async () => {
  try{
    await createApplicationMutation.mutateAsync({
      name: formModel.name,
      displayName: formModel.displayName,
      type: formModel.type,
      redirectUris: formModel.redirectUris,
    })
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
  <Modal ref="addAppModal" title="Add application">
    <Form
        title="Add application"
        @submit="createApplication"
        :vuelidate="v$"
        submit-text="Create application"
    >
      <Input label="Name"
             v-model="v$.name.$model"
             :vuelidate="v$.name"
             required
             helper-text="The name of the application. Must be unique."
      />
      <Input label="Display Name"
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
    </Form>
  </Modal>
</template>

<style scoped>

</style>