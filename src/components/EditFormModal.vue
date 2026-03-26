<script setup>
import ModalPopup from "./ModalPopup.vue";
import KeylineForm from "./KeylineForm.vue";
import {ref} from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  vuelidate: {
    default: undefined,
  },
})

defineEmits(['submit'])

const popup = ref(null)

const open = () => popup.value?.open()
const close = () => popup.value?.close()

defineExpose({open, close})
</script>

<template>
  <ModalPopup ref="popup">
    <KeylineForm :title="title" @submit="$emit('submit')" :vuelidate="vuelidate">
      <slot/>
    </KeylineForm>
  </ModalPopup>
</template>
