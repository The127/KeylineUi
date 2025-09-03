<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-sm text-gray-500">
      {{ title }}
    </span>
    <div class="flex flex-row items-center gap-2">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>