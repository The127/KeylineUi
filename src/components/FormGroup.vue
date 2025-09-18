<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <fieldset class="flex flex-col gap-2 p-2 border-none">
    <legend class="text-sm font-semibold">
      {{ title }}
    </legend>
    <slot/>
  </fieldset>
</template>

<style scoped>

</style>