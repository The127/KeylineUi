<script setup>

import {inject, onMounted, ref, useId} from "vue";

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
})

const manager = inject('radioManager')

onMounted(() => {
  manager.register({
    id: id,
    value: props.value,
    label: props.label,
  })
})

</script>

<template>

</template>

<style scoped>

</style>