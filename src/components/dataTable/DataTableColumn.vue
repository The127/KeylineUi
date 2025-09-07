<script setup>

import {inject, onMounted} from "vue";

const props = defineProps({
  columnName: {
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
    columnName: props.columnName,
    title: props.title,
  })
})

</script>

<template>
  <td class="px-5 py-3">
    <slot/>
  </td>
</template>

<style scoped>

</style>