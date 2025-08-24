<script setup>

const props = defineProps({
  label: {
    type: String,
    required: true,
  }
})

</script>

<template>
  <label>{{ label }}</label>
  <input></input>
</template>

<style scoped>

</style>