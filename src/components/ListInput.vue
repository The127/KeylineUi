<script setup>

import Input from "./Input.vue";
import Button from "./Button.vue";
import {ref} from "vue";
import { Plus, Minus, Pencil } from "lucide-vue-next"
import Modal from "./Modal.vue";

const model = defineModel()

const currentValue = ref("")

const props = defineProps({
  label: {
    type: String,
    required: true,
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
        class="flex items-center gap-2 flex-wrap justify-between"
    >
      <span>{{ item }}</span>
      <div class="flex items-center gap-2">
        <Button
            variant="danger"
            text="remove"
            size="sm"
            hide-text
            @click="model.splice(model.indexOf(item), 1)"
        >
          <template #adornment>
            <Minus class="w-4 h-4"/>
          </template>
        </Button>
      </div>
    </div>
    <div class="flex items-center gap-2 justify-between">
      <Input
          container-class="flex-1"
          hide-label
          :label="label" v-model="currentValue"
          @keydown="onInputKeydown"
      />
      <Button
          text="add"
          hide-text
          variant="secondary"
          @click="addCurrentValue"
          :disabled="currentValue === ''"
      >
        <template #adornment>
          <Plus class="w-4 h-4"/>
        </template>
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>