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
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-semibold',
  h3: 'text-xl font-medium',
  h4: 'text-lg font-medium',
  h5: 'text-base font-medium',
  h6: 'text-sm font-medium',
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