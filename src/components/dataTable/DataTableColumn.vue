<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <td>
    <slot/>
  </td>
</template>

<style scoped>

</style>