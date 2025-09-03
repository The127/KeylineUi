<script setup>

import Heading from "../Heading.vue";
import Button from "../Button.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <div class="flex flex-row justify-between items-center gap-4 flex-wrap">
    <Heading level="h3">{{ title }}</Heading>
    <slot name="actions"/>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <slot/>
  </div>
</template>

<style scoped>

</style>