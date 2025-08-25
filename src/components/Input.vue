<script setup>

import {useUniqueId} from "../composables/uniqueId.js";

const inputId = useUniqueId('input')

const model = defineModel()

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  vuelidate: {
    type: Object,
  },
})

</script>

<template>
  <label :for="inputId">{{ label }}</label>
  <input :label="label" v-model="model" :id="inputId"/>
  <span class="text-red-700" v-if="vuelidate && vuelidate.$error">
    {{ vuelidate.$errors[0].$message }}
  </span>

</template>

<style scoped>

</style>