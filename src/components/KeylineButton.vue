<script setup>

import variants from "./buttonVariants.js";
import {cva} from "class-variance-authority";

defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit'].includes(value),
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => Object.keys(variants.intent).includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => Object.keys(variants.size).includes(value),
  },
  text: {
    type: String,
    required: true,
  },
  hideText: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  adornment: {
    type: String,
    default: 'start',
    validator: (value) => ['start', 'end'].includes(value),
  },
})

const buttonClass = cva([
      "cursor-pointer",
      "transition-colors",
      "duration-200",
      "ease-in-out",
      "border-box",
    ], {
      variants: variants,
    },
)

</script>

<template>
  <button
      :class="buttonClass({intent: variant, size: size,})"
      :type="type"
      :aria-label="text"
      :disabled="disabled"
      v-bind="$attrs"
  >
    <div class="flex flex-row items-center justify-center gap-2">
      <slot v-if="adornment === 'start'" name="adornment"/>
      <template v-if="!hideText">
        {{ text }}
      </template>
      <slot v-if="adornment === 'end'" name="adornment"/>
    </div>
  </button>
</template>

<style scoped>
</style>