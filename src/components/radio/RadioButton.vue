<script setup>

import {inject, onMounted, useId} from "vue";

const id = useId()

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  helperText: {
    type: String,
    required: false,
  },
})

const manager = inject('radioManager')

onMounted(() => {
  manager.register({
    id: id,
    value: props.value,
    label: props.label,
    helperText: props.helperText,
  })
})

</script>

<template>
  <slot/>
</template>

<style scoped>

</style>