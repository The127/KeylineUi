<script setup>

import {inject, onMounted} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const tableManager = inject('tableManager')

onMounted(() => {
  tableManager.register({
    title: props.title,
  })
})

</script>

<template>
  <td>
    <slot/>
  </td>
</template>

<style scoped>

</style>