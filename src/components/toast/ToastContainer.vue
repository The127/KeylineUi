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
const isHovered = ref(false)

const show = (options) => {
  if (toasts.value.length >= props.maximum) {
    toasts.value.shift()
  }

  const id = Date.now() + Math.random()
  const duration = options.timeout || props.timeout
  const toast = {
    id,
    text: options.text,
    type: options.type ?? 'info',
    timeout: duration,
    remaining: ref(duration),
  }

  toasts.value.unshift(toast)

  const start = Date.now()
  function update() {
    const elapsed = Date.now() - start
    toast.remaining.value = Math.max(0, duration - elapsed)
    if (elapsed < duration) {
      requestAnimationFrame(update)
    } else {
      toasts.value = toasts.value.filter(t => t.id !== toast.id)
    }
  }
  requestAnimationFrame(update)
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

const plain = (text, options) => {
  show({
    text,
    type: 'plain',
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
    "px-5",
    "py-3",
    "shadow-md",
    "absolute",
    "transition-all",
    "w-64",
  ], {
    variants: variants,
  },
)

</script>

<template>
  <slot/>
  <div
      class="fixed top-2 right-2 flex flex-col items-end z-50"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
  >
    <div
      v-for="(toast, idx) in toasts"
      :key="toast.id"
      :class="toastClass({intent: toast.type})"
      :style="{
          zIndex: toasts.length - idx, // newest on top
          opacity: isHovered || idx === 0 ? 1 : 0.9,
          top: isHovered ? `${idx * 70}px` : `${idx * 10}px`, // fan out vs stacked
          filter: isHovered || idx === 0 ? 'none' : 'brightness(0.9)',
        }"
    >
      <span class="text-sm">
        {{ toast.text }}
      </span>

      <progress
          class="absolute bottom-0 left-0 w-full h-1"
          :value="toast.remaining"
          :max="toast.timeout"
      ></progress>
    </div>
  </div>
</template>

<style scoped>

</style>