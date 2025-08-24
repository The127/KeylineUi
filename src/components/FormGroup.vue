<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <fieldset>
    <legend>{{ title }}</legend>
    <slot/>
  </fieldset>
</template>

<style scoped>

</style>