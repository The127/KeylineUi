<script setup>

import variants from "./buttonVariants.js";
import {cva} from "class-variance-authority";

const props = defineProps({
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
  disabled: {
    type: Boolean,
    default: false,
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
      v-text="text"
      :disabled="disabled"
      v-bind="$attrs"
  />
</template>

<style scoped>
</style>