<script setup>

import {computed} from "vue";

const props = defineProps({
  dep: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
    validator: v => ['text', 'image'].includes(v),
  },
})

const isDependencyLoaded = computed(() => props.dep !== undefined)

</script>

<template>
  <template v-if="isDependencyLoaded">
    <slot/>
  </template>
  <span
      v-else
      class="rounded-full bg-slate-300 animate-pulse"
  />
</template>

<style scoped>

</style>