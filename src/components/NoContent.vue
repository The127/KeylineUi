<script setup>

import {computed} from "vue";

const props = defineProps({
  cond: {
    required: true,
  },
  message: {
    type: String,
    default: null,
  }
})

const messageValue = computed(() => {
  if (props.message) {
    return props.message
  }
  return "No content"
})

</script>

<template>
  <slot v-if="cond" name="no-content">
    <span  class="text-slate-600">
      {{ messageValue }}
    </span>
  </slot>
  <slot v-else/>
</template>

<style scoped>

</style>