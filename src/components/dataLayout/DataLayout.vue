<script setup>

import HeadingBar from "../HeadingBar.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <HeadingBar :title="title">
    <template #actions>
      <slot name="actions"/>
    </template>
  </HeadingBar>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <slot/>
  </div>
</template>

<style scoped>

</style>