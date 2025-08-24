<script setup>

import Heading from "./Heading.vue";
import Button from "./Button.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <form>
    <Heading>{{ title }}</Heading>
    <slot/>
    <Button text="TODO: submit"/>
  </form>
</template>

<style scoped>

</style>