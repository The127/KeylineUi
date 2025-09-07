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
        <tr
            class="bg-emerald-600 text-slate-50"
        >
          <th
              v-for="column in columns"
              :key="column.title"
              class="text-start px-5 py-3 font-semibold text-sm uppercase tracking-wide"
          >
            {{ column.title }}
          </th>
        </tr>

        <tr v-if="isPending" class="bg-emerald-100 relative h-1">
          <td :colspan="columns.length" class="p-0">
            <div class="overflow-hidden h-1">
              <div class="loading-bar bg-emerald-300 h-1"></div>
            </div>
          </td>
        </tr>
      </thead>

      <tbody>
        <tr
            v-if="!isPending"
            v-for="item in data.items"
            :key="props.idSelector(item)"
            class="odd:bg-slate-50 even:bg-slate-100 hover:bg-emerald-200"
        >
          <slot :item="item"/>
        </tr>
      </tbody>

      <tfoot
          v-if="!isPending"
          class="bg-slate-200 border-t border-slate-300"
      >
        <tr>
          <td :colspan="columns.length" class="px-5 py-3">
            TODO: Pagination
          </td>
        </tr>
      </tfoot>
    </table>
  </Box>
</template>

<style scoped>
@keyframes loadingBar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.loading-bar {
  width: 50%;
  animation: loadingBar 1.5s linear infinite;
}
</style>