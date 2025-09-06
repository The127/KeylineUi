<script setup>

import Heading from "./Heading.vue";
import Box from "./Box.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
})

</script>

<template>
  <Box class="flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-shadow">
    <Heading level="h4">
      {{ title }}
    </Heading>
    <span v-if="subtitle" class="text-sm text-slate-600">
      {{ subtitle }}
    </span>
  </Box>
</template>

<style scoped>

</style>