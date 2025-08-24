<script setup>

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <label>{{ label }}</label>
  <slot/>
</template>

<style scoped>

</style>