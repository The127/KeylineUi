<script setup>

import {provide, ref} from "vue";
import {TOAST_SYMBOL} from "../../composables/toast.js";

const props = defineProps({
  maximum: {
    type: Number,
    default: 5,
  },
  timeout: {
    type: Number,
    default: 5000,
  },
})

const toasts = ref([])

const show = (info) => {
  toasts.value.push(info)
}

const success = (text, options) => {
  show({
    text,
    type: 'success',
    ...options,
  })
}

const error = (text, options) => {
  show({
    text,
    type: 'error',
    ...options,
  })
}

const info = (text, options) => {
  show({
    text,
    type: 'info',
    ...options,
  })
}

const warning = (text, options) => {
  show({
    text,
    type: 'warning',
    ...options,
  })
}

provide(TOAST_SYMBOL, {
  show,
  success,
  error,
  info,
  warning,
})

</script>

<template>
  <slot/>
  <template v-for="toast in toasts">
    <span class="text-red-500">
      {{ toast.text }}
    </span>
  </template>
</template>

<style scoped>

</style>