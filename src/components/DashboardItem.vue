<script setup>

import Heading from "./Heading.vue";
import Box from "./Box.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  to: {
    type: undefined,
    required: true,
  },
})

</script>

<template>
  <Box
      class="flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-shadow"
      @click="router.push(to)"
  >
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