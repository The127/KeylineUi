<script setup>

import Heading from "./Heading.vue";

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
  <div class="flex flex-col gap-3">
    <div class="flex flex-row justify-between items-baseline gap-5 flex-wrap">
      <div>
        <Heading>{{ title }}</Heading>
        <p
            v-if="subtitle"
            class="text-sm text-slate-600"
        >
          {{ subtitle }}
        </p>
      </div>
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>