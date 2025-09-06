<script setup>

import {computed, provide, ref, watch} from "vue";
import {TOAST_SYMBOL} from "../../composables/toast.js";
import {cva} from "class-variance-authority";
import variants from "./toastVariants.js";
import { X } from "lucide-vue-next"


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

const remove = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

const show = (options) => {
  if (toasts.value.length >= props.maximum) {
    toasts.value.pop()
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

provide(TOAST_SYMBOL, {
  show,
  success,
  error,
  info,
  warning,
})

const toastClass = cva([
    "rounded-md",
    "px-5",
    "py-3",
    "shadow-md",
    "absolute",
    "transition-all",
    "w-64",
    "toast",
  ], {
    variants: variants,
  },
)

</script>

<template>
  <slot/>
  <div
      class="fixed bottom-2 right-2 flex flex-col items-end z-50"
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
          bottom: isHovered ? `${idx * 70}px` : `${idx * 10}px`, // fan out vs stacked
          filter: isHovered || idx === 0 ? 'none' : 'brightness(0.9)',
        }"
    >
      <div class="text-sm flex flex-row justify-between items-center gap-2">
        <span class="overflow-hidden whitespace-nowrap overflow-ellipsis">
          {{ toast.text }}
        </span>

        <div class="cursor-pointer w-4 h-4 hover:text-slate-500">
          <X class="w-4 h-4" @click="remove(toast.id)"/>
        </div>
      </div>

      <progress
          class="absolute bottom-0 left-0 w-full h-1"
          :value="toast.remaining"
          :max="toast.timeout"
      />
    </div>
  </div>
</template>

<style scoped>
.toast::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 50px;
}
</style>