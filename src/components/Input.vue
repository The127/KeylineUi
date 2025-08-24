<script setup>

import {useUniqueId} from "../composables/uniqueId.js";

const inputId = useUniqueId('input')

const props = defineProps({
  label: {
    type: String,
    required: true,
  }
})

</script>

<template>
  <label :for="inputId">{{ label }}</label>
  <input :id="inputId"></input>
</template>

<style scoped>

</style>