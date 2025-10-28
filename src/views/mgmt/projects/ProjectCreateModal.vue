<script setup>

import ModalPopup from "../../../components/ModalPopup.vue";
import {defineExpose, reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useRoute} from "vue-router";
import {useToast} from "../../../composables/toast.js";
import KeylineForm from "../../../components/KeylineForm.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import {useCreateProjectMutation} from "../../../api/projects.js";

const route = useRoute()
const toast = useToast()

const addProjectModal = ref(null)

const formModel = reactive({
  slug: '',
  name: '',
})

const formRules = {
  slug: { required, },
  name: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  formModel.name = ''
  formModel.displayName = ''
  formModel.redirectUris = []
  formModel.type = 'public'

  v$.value.$reset()

  addProjectModal.value.open()
}

const createProjectMutation = useCreateProjectMutation(route.params.vsName)

const createProject = async () => {
  try{
    const createResponse = await createProjectMutation.mutateAsync({
      name: formModel.name,
      slug: formModel.slug,
      description: '',
    })

    toast.success('Project created')
  }catch(e) {
    console.error(e)
    toast.error('Failed to create project')
  }

  addProjectModal.value.close()
}

defineExpose({
  open,
});

</script>

<template>
  <ModalPopup ref="addProjectModal" title="Add project">
    <KeylineForm
        title="Add project"
        @submit="createProject"
        :vuelidate="v$"
        submit-text="Create project"
    >
      <KeylineInput
          label="Name"
          v-model="v$.name.$model"
          :vuelidate="v$.name"
          required
          helper-text="The name of the project."
      />
      <KeylineInput
          label="Slug"
          v-model="v$.slug.$model"
          :vuelidate="v$.slug"
          required
          helper-text="The slug of the project. Must be unique."
      />
    </KeylineForm>
  </ModalPopup>
</template>

<style scoped>

</style>