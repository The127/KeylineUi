<script setup>

import {inject, onMounted} from "vue";

const props = defineProps({
  field: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const tableManager = inject('tableManager')

onMounted(() => {
  tableManager.register({
    field: props.field,
    title: props.title,
  })
})

</script>

<template>
  <th
    class="text-start px-5 py-3 font-semibold text-sm uppercase tracking-wide"
  >
    {{ title }}
  </th>
</template>

<style scoped>
</style>