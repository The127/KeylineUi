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
    validator: (value) => ['primary', 'secondary', 'link', 'special'].includes(value),
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

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'border-3 border-emerald-700 hover:border-emerald-600 hover:bg-emerald-600 ' +
          'hover:text-slate-100 ' +
          'px-5 py-3 rounded-md'

    case 'secondary':
      return 'bg-slate-700 ' +
          'px-5 py-3 rounded-md'

    case 'link':
      return 'text-emerald-500 hover:text-emerald-600 ' +
          'underline hover:no-underline'

    case 'special':
      return 'bg-gradient-to-r from-emerald-500 to-teal-500 ' +
          'hover:from-emerald-400 hover:to-teal-400 ' +
          'text-slate-100 tracking-wider uppercase ' +
          'px-5 py-3 rounded-md'
  }
})

</script>

<template>
  <button
      :class="[variantClass]"
      class="cursor-pointer"
      :type="type"
      :aria-label="text"
      v-text="text"
      :disabled="disabled"
      v-bind="$attrs"
  />
</template>

<style scoped>
</style>