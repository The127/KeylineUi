<script setup>

import KeylineInput from "./KeylineInput.vue";
import {ref} from "vue";
import {X} from "lucide-vue-next"

const model = defineModel()

const currentValue = ref("")

defineProps({
  label: {
    type: String,
    required: true,
  },
  helperText: {
    type: String,
    required: false,
    default: null,
  },
})

const addCurrentValue = () => {
  if (!currentValue.value) return
  model.value.push(currentValue.value)
  currentValue.value = ""
}

const onInputKeydown = (e) => {
  if (e.key === 'Enter') {
    addCurrentValue()
    e.preventDefault()
  }
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <div
        v-for="item in model"
        :key="item"
        class="flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
    >
      <span class="text-slate-700">{{ item }}</span>
      <button
          type="button"
          class="text-slate-400 hover:text-red-600 cursor-pointer transition-colors"
          @click="model.splice(model.indexOf(item), 1)"
      >
        <X class="w-4 h-4"/>
      </button>
    </div>
    <KeylineInput
        hide-label
        :label="label" v-model="currentValue"
        @keydown="onInputKeydown"
        :helper-text="helperText"
    />
    <button
        v-if="currentValue"
        type="button"
        @click="addCurrentValue"
        class="self-start text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium"
    >
      + Add "{{ currentValue }}"
    </button>
    <span v-else class="text-xs text-slate-400">Press Enter to add</span>
  </div>
</template>
