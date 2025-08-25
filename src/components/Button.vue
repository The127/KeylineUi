<script setup>

import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'link'].includes(value),
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

</script>

<template>
  <button
      class="bg-emerald-700 px-5 py-3 rounded-md text-slate-100 cursor-pointer tracking-wider uppercase"
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