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
    validator: (value) => ['primary', 'secondary', 'danger', 'link', 'special'].includes(value),
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
      return 'bg-emerald-500 hover:bg-emerald-600 ' +
          'text-slate-100 hover:text-slate-100 ' +
          'px-5 py-3 rounded-md'

    case 'secondary':
      return 'border-3 border-slate-700 ' +
          'hover:text-slate-100 hover:bg-slate-700 ' +
          'px-5 py-3 rounded-md'

    case 'danger':
      return 'border-3 border-red-700 ' +
          'hover:text-slate-100 hover:bg-red-700 ' +
          'px-5 py-3 rounded-md'

    case 'link':
      return 'text-emerald-500 hover:text-emerald-600 ' +
          'underline hover:no-underline'

    case 'special':
      return 'bg-gradient-to-r from-emerald-500 to-teal-500 ' +
          'hover:from-emerald-400 hover:to-teal-400 ' +
          'text-slate-100 hover:text-slate-50 tracking-wider uppercase ' +
          'px-5 py-3 rounded-md'
  }
})

</script>

<template>
  <button
      :class="[variantClass]"
      class="cursor-pointer transition-colors duration-200 ease-in-out border-box"
      :type="type"
      :aria-label="text"
      v-text="text"
      :disabled="disabled"
      v-bind="$attrs"
  />
</template>

<style scoped>
</style>