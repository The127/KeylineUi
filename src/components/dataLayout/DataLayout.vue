<script setup>

import HeadingText from "../HeadingText.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <div class="flex flex-row justify-between items-center gap-4 flex-wrap">
    <HeadingText level="h3">{{ title }}</HeadingText>
    <slot name="actions"/>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <slot/>
  </div>
</template>

<style scoped>

</style>