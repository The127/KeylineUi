<script setup>

import {provide, ref} from "vue";
import Box from "../Box.vue";

const props = defineProps({
  queryFn: {
    required: true,
  },
  idSelector: {
    type: Function,
    validator: v => typeof v === 'function',
    default: x => x.id ?? x,
  },
})

const {data, isPending} = props.queryFn()

const columns = ref([])

const register = (column) => {
  for (let i = 0; i < columns.value.length; i++) {
    if (columns.value[i].columnName === column.columnName) {
      columns.value[i] = column
      return
    }
  }

  columns.value.push(column)
}

provide('tableManager', {
  register,
})

</script>

<template>
  <Box class="px-0 py-0 overflow-x-hidden">
    <table class="w-full">
      <thead>
        <tr class="bg-emerald-500">
          <th
              v-for="column in columns"
              :key="column.title"
              class="px-5 py-3"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
            v-if="!isPending"
            v-for="item in data.items"
            :key="props.idSelector(item)"
            class="bg-slate-200 hover:bg-emerald-100"
        >
          <slot :item="item"/>
        </tr>
      </tbody>

      <tfoot v-if="!isPending">
        TODO: Pagination
      </tfoot>
    </table>
  </Box>
</template>

<style scoped>

</style>