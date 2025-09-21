<script setup>

import KeylineInput from "./KeylineInput.vue";
import {ref} from "vue";
import { Plus, Minus } from "lucide-vue-next"
import KeylineButton from "./KeylineButton.vue";

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
        class="flex items-center gap-2 flex-wrap justify-between"
    >
      <span>{{ item }}</span>
      <div class="flex items-center gap-2">
        <KeylineButton
            variant="danger"
            text="remove"
            size="sm"
            hide-text
            @click="model.splice(model.indexOf(item), 1)"
        >
          <template #adornment>
            <Minus class="w-4 h-4"/>
          </template>
        </KeylineButton>
      </div>
    </div>
    <div class="flex items-center gap-2 justify-between">
      <KeylineInput
          container-class="flex-1"
          hide-label
          :label="label" v-model="currentValue"
          @keydown="onInputKeydown"
          :helper-text="helperText"
      />
      <KeylineButton
          text="add"
          hide-text
          variant="secondary"
          @click="addCurrentValue"
          :disabled="currentValue === ''"
      >
        <template #adornment>
          <Plus class="w-4 h-4"/>
        </template>
      </KeylineButton>
    </div>
  </div>
</template>

<style scoped>

</style>