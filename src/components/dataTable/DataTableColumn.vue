<script setup>

import {inject, onMounted} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
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