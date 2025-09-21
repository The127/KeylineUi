<script setup>

import {computed} from "vue";

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  dep: {
    type: undefined,
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
  <div
      v-else
      class="rounded-full bg-slate-300 animate-pulse"
      v-bind="$attrs"
  />
</template>

<style scoped>

</style>