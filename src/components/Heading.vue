<script setup>

import {computed} from "vue";

const props = defineProps({
  level: {
    type: String,
    default: 'h1',
    validator: v => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(v),
  },
})

const defaultClasses = {
  h1: 'text-3xl font-bold mb-4',
  h2: 'text-2xl font-semibold mb-3',
  h3: 'text-xl font-medium mb-2',
  h4: 'text-lg font-medium mb-1',
  h5: 'text-base font-medium mb-1',
  h6: 'text-sm font-medium mb-1',
}

const headingClass = computed(() => defaultClasses[props.level])

</script>

<template>
  <component
      :is="level"
      :class="headingClass"
      v-bind="$attrs"
  >
    <slot/>
  </component>
</template>

<style scoped>

</style>