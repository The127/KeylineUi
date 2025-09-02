<script setup>

import {provide, ref} from "vue";
import {TOAST_SYMBOL} from "../../composables/toast.js";
import {cva} from "class-variance-authority";
import variants from "./toastVariants.js";

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

  info.id = Date.now() + Math.random()
  toasts.value.push(info)

  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== info.id)
  }, info.timeout)
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

const plain = (text, options) => {
  show({
    text,
    type: 'plain',
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
  plain,
})

const toastClass = cva([
  "rounded-md",
  "p-2",
  "m-2",
  "shadow-md",
], {
  variants: variants,
})

</script>

<template>
  <slot/>
  <div class="fixed top-0 right-0 z-50">
    <div
      v-for="toast in toasts"
      :class="toastClass({intent: toast.type})"
    >
      <span>
        {{ toast.text }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>