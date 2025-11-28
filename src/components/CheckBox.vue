<script setup>

import {computed, useId} from "vue";

defineOptions({
  inheritAttrs: false,
})

const inputId = useId()

const model = defineModel()

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  hideLabel: {
    type: Boolean,
    default: false,
  },
  vuelidate: {
    type: Object,
  },
  required: {
    type: Boolean,
    default: false,
  },
  helperText: {
    type: String,
    default: null,
  },
  containerClass: {
    type: String,
    default: null,
  },
})

const hasError = computed(() => !!props.vuelidate && props.vuelidate.$error)

</script>

<template>
  <div class="flex flex-col gap-1 group">
    <label :for="inputId" class="flex flex-row items-center gap-3" :class="containerClass">
      <div class="relative flex flex-row items-center">
        <input
            :id="inputId"
            type="checkbox"
            v-model="model"
            v-bind="$attrs"
            class="sr-only"
        />
        <span class="slider h-full"></span>
      </div>
      <span class="h-full" :class="{'sr-only': hideLabel}">
        {{ label }}
        <sup v-if="required">*</sup>
      </span>
    </label>

    <span class="text-red-600 text-xs" v-if="hasError">
      {{ vuelidate.$errors[0].$message }}
    </span>
    <span class="not-dark:text-slate-500 dark:text-slate-400 text-xs" v-if="helperText">
      {{ helperText }}
    </span>
  </div>
</template>

<style scoped>


</style>
