<script setup>

import {useRoute} from "vue-router";
import {useToast} from "../../../../../composables/toast.js";
import useVuelidate from "@vuelidate/core";
import {useCreateResourceServerMutation} from "../../../../../api/resourceServers.js";
import ModalPopup from "../../../../../components/ModalPopup.vue";
import KeylineForm from "../../../../../components/KeylineForm.vue";
import KeylineInput from "../../../../../components/KeylineInput.vue";
import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";

const route = useRoute()
const toast = useToast()

const addResourceServerModal = ref(null)

const formModel = reactive({
  name: '',
})

const formRules = {
  name: {required},
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  formModel.name = ''

  v$.value.$reset()

  addResourceServerModal.value.open()
}

const createResourceServerMutation = useCreateResourceServerMutation(
    route.params.vsName,
    route.params.projectSlug,
)

const createResourceServer = async () => {
  try {
    const _ = await createResourceServerMutation.mutateAsync({
      name: formModel.name,
    })

    toast.success('Resource server created')
  } catch (e) {
    console.error(e)
    toast.error('Failed to create resource server')
  }
}

defineExpose({
  open,
})

</script>

<template>
  <ModalPopup ref="addResourceServerModal" title="Add resource server">
    <KeylineForm
        title="Add resource server"
        @submit="createResourceServer"
        :vuelidate="v$"
        submit-text="Create resource server"
    >
      <KeylineInput
          label="Name"
          v-model="v$.name.$model"
          :vuelidate="v$.name"
          required
          helper-text="The name of the resource server."
      />
    </KeylineForm>
  </ModalPopup>
</template>

<style scoped>

</style>