<script setup>

import {useRoute} from "vue-router";
import {useToast} from "../../../../../composables/toast.js";
import {reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {useCreateRoleMutation} from "../../../../../api/roles.js";
import ModalPopup from "../../../../../components/ModalPopup.vue";
import KeylineForm from "../../../../../components/KeylineForm.vue";
import KeylineInput from "../../../../../components/KeylineInput.vue";
import {required} from "@vuelidate/validators";

const route = useRoute()
const toast = useToast()

const addRoleModal = ref(null)

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

  addRoleModal.value.open()
}

const createRoleMutation = useCreateRoleMutation(
    route.params.vsName,
    route.params.projectSlug,
)

const createRole = async () => {
  try{
    const _ = await createRoleMutation.mutateAsync({
      name: formModel.name,
    })

    toast.success('Role created')
  }catch (e) {
    console.error(e)
    toast.error('Failed to create role')
  }

  addRoleModal.value.close()
}

defineExpose({
  open,
})

</script>

<template>
  <ModalPopup ref="addRoleModal" title="Add role">
    <KeylineForm
      title="Add role"
      @submit="createRole"
      :vuelidate="v$"
      submit-text="Create role"
    >
      <KeylineInput
        label="Name"
        v-model="v$.name.$model"
        :vuelidate="v$.name"
        required
        helper-text="The name of the role. Must be unique."
      />
    </KeylineForm>
  </ModalPopup>
</template>

<style scoped>

</style>