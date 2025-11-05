<script setup>

import HeadingText from "./HeadingText.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  headingLevel: {
    type: String,
    default: "h3",
  },
})

</script>

<template>
  <div class="flex flex-row justify-between items-center gap-4 flex-wrap">
    <HeadingText :level="headingLevel">{{ title }}</HeadingText>
    <slot name="actions"/>
  </div>
</template>

<style scoped>

</style>