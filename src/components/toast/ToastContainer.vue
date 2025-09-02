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
  if (toasts.value.length >= props.maximum) {
    toasts.value.shift()
  }

  toasts.value.push(info)
}

const success = (text, options) => {
  show({
    text,
    type: 'success',
    timeout: props.timeout,
    ...options,
  })
}

const error = (text, options) => {
  show({
    text,
    type: 'error',
    timeout: props.timeout,
    ...options,
  })
}

const info = (text, options) => {
  show({
    text,
    type: 'info',
    timeout: props.timeout,
    ...options,
  })
}

const warning = (text, options) => {
  show({
    text,
    type: 'warning',
    timeout: props.timeout,
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
  <div class="fixed top-0 right-0 z-50">
    <div
      v-for="toast in toasts"
    >
      <span>
        {{ toast.text }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>