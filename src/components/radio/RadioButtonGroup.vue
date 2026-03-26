<script setup>

import {provide, ref} from "vue";

const model = defineModel()

defineProps({
  name: {
    type: String,
    required: true,
  },
})

const options = ref([])

provide('radioManager', {
  register: (option) => {
    options.value.push(option)
  },
})

</script>

<template>
  <slot/>

  <div class="flex gap-3">
    <button
        v-for="option in options"
        :key="option.id"
        type="button"
        @click="model = option.value"
        class="flex-1 flex flex-col gap-1 rounded-lg border-2 px-4 py-3 text-left cursor-pointer transition-colors"
        :class="model === option.value
          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'"
    >
      <span class="font-medium text-sm">{{ option?.label ?? option.value }}</span>
      <span class="text-xs text-slate-500" v-if="option.helperText">
        {{ option.helperText }}
      </span>
    </button>
  </div>
</template>
