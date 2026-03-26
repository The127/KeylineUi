<script setup>
import ModalPopup from "./ModalPopup.vue";
import KeylineForm from "./KeylineForm.vue";
import {ref, computed, isRef} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  vuelidate: {
    default: undefined,
  },
})

defineEmits(['submit'])

const unwrappedVuelidate = computed(() => {
  if (!props.vuelidate) return undefined
  return isRef(props.vuelidate) ? props.vuelidate.value : props.vuelidate
})

const popup = ref(null)

const open = () => popup.value?.open()
const close = () => popup.value?.close()

defineExpose({open, close})
</script>

<template>
  <ModalPopup ref="popup">
    <KeylineForm :title="title" @submit="$emit('submit')" :vuelidate="unwrappedVuelidate">
      <slot/>
    </KeylineForm>
  </ModalPopup>
</template>
