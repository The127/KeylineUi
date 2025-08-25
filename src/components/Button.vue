<script setup>

import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'link'].includes(value),
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'special'].includes(value),
  },
  text: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const isLink = computed(() => props.type === 'link')

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'border-3 border-emerald-700 hover:border-emerald-600 hover:bg-emerald-600 ' +
          'hover:text-slate-100'
    case 'secondary':
      return 'bg-slate-700'
    case 'special':
      return 'bg-gradient-to-r from-emerald-500 to-teal-500 ' +
          'hover:from-emerald-400 hover:to-teal-400 ' +
          'text-slate-100 tracking-wider uppercase'
  }
})

</script>

<template>
  <button
      :class="[variantClass]"
      class="px-5 py-3 rounded-md cursor-pointer "
      v-if="!isLink"
      :type="type"
      :aria-label="text"
      v-text="text"
      :disabled="disabled"
      v-bind="$attrs"
  />
  <a
      v-else
      v-text="text"
      v-bind="$attrs"
  />
</template>

<style scoped>
</style>