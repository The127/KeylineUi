<script setup>

import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useRoute} from "vue-router";
import ModalPopup from "../../../../../components/ModalPopup.vue";
import KeylineForm from "../../../../../components/KeylineForm.vue";
import KeylineInput from "../../../../../components/KeylineInput.vue";
import {useToast} from "../../../../../composables/toast.js";
import {usePatchApplicationMutation} from "../../../../../api/applications.js";

const route = useRoute()
const toast = useToast()
const el = ref(null)

const props = defineProps({
  data: {
    required: true,
  },
})

const formModel = reactive({
  displayName: '',
})

const formRules = {
  displayName: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const open = () => {
  formModel.displayName = props.data.displayName
  el.value.open();
};

defineExpose({
  open,
})

const updateInfo = usePatchApplicationMutation(
    route.params.vsName,
    props.data.id,
)

const onFormSubmit = async () => {
  try {
    await updateInfo.mutateAsync({
      displayName: formModel.displayName,
    })
    toast.success("Updated application information successfully.")
    el.value.close()
  } catch (e) {
    console.error(e)
    toast.error("Failed to update application information.")
  }
}

</script>

<template>
  <ModalPopup ref="el">
    <KeylineForm title="Edit information"
                 @submit="onFormSubmit"
                 :vuelidate="$v"
    >
      <KeylineInput label="Display Name"
                    v-model="v$.displayName.$model"
                    :vuelidate="v$.displayName"
                    required
      />
    </KeylineForm>
  </ModalPopup>
</template>

<style scoped>

</style>