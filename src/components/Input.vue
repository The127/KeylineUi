<script setup>

import {useUniqueId} from "../composables/uniqueId.js";
import {computed} from "vue";

defineOptions({
  inheritAttrs: false,
})

const inputId = useUniqueId('input')

const model = defineModel()

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  vuelidate: {
    type: Object,
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password', 'email'].includes(value),
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  helperText: {
    type: String,
    default: null,
  },
})

const placeholderValue = computed(() => props.placeholder ?? props.label)

</script>

<template>
  <div class="flex flex-col gap-1 group">
    <div class="flex flex-row justify-between text-sm">
      <label
          :for="inputId"
          class="text-slate-700 group-focus-within:text-slate-900 font-bold"
      >
        {{ label }}
        <sup v-if="required">*</sup>
      </label>
      <slot name="action"/>
    </div>
    <input
        :type="type"
        class="border border-slate-900 p-2 rounded-md"
        :label="label"
        v-model="model"
        :id="inputId"
        :placeholder="placeholderValue"
        v-bind="$attrs"
    />
    <span class="text-red-700 text-xs" v-if="vuelidate && vuelidate.$error">
      {{ vuelidate.$errors[0].$message }}
    </span>
    <span class="text-slate-500 text-xs" v-if="helperText">
      {{ helperText }}
    </span>
  </div>
</template>

<style scoped>

</style>