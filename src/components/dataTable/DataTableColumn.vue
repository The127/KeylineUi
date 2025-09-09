<script setup>

import {inject, onMounted, ref} from "vue";
import {ChevronUp, ChevronDown, Minus} from "lucide-vue-next";

const props = defineProps({
  field: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  initialOrder: {
    type: String,
    default: null,
  },
  enableOrder: {
    type: Boolean,
    default: false,
  },
})

const direction = ref(null)

const tableManager = inject('tableManager')

onMounted(() => {
  tableManager.register({
    field: props.field,
    title: props.title,
    resetOrder: () => {
      direction.value = null
    },
  })

  if (props.initialOrder && props.enableOrder) {
    direction.value = props.initialOrder
    tableManager.orderBy(props.field, props.initialOrder)
  }
})

const toggleOrder = () => {
  if (!props.enableOrder) {
    return
  }

  if (direction.value === null) {
    direction.value = 'asc'
  } else if (direction.value === 'asc') {
    direction.value = 'desc'
  } else {
    direction.value = null
  }

  tableManager.orderBy(direction.value ? props.field : null, direction.value)
}
</script>

<template>
  <th
    class="text-start px-5 py-3 font-semibold text-sm uppercase tracking-wide"
    :class="{'cursor-pointer': enableOrder}"
    @click="toggleOrder"
  >
    <div class="flex flex-row gap-1 items-center">
      <span>{{ title }}</span>
      <template v-if="enableOrder">
        <template v-if="direction === 'asc'">
          <ChevronDown/>
        </template>
        <template v-else-if="direction === 'desc'">
          <ChevronUp/>
        </template>
        <template v-else>
          <Minus/>
        </template>
      </template>
    </div>
  </th>
</template>

<style scoped>
</style>