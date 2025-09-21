<script setup>

defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <fieldset class="flex flex-col gap-2 py-2 border-none">
    <legend class="text-sm font-semibold">
      {{ title }}
    </legend>
    <slot/>
  </fieldset>
</template>

<style scoped>

</style>