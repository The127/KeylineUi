<script setup>

import Heading from "./Heading.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
})

</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-row justify-between items-baseline gap-5 flex-wrap">
      <Heading>{{ title }}</Heading>
      <slot/>
    </div>
    <p v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>

</style>