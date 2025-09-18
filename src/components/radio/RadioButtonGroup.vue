<script setup>

import {provide, ref} from "vue";

const model = defineModel()

const props = defineProps({
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

  <div
      v-for="option in options"
      :key="option.id"
      class="flex items-center gap-2"
  >
    <input
        type="radio"
        :id="option.id"
        :value="option.value"
        :name="name"
        v-model="model"
    />
    <label :for="option.id">{{ option?.label ?? option.value }}</label>
  </div>
</template>

<style scoped>

</style>