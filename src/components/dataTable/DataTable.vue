<script setup>

import {provide, ref} from "vue";
import Box from "../Box.vue";
import Skeleton from "../Skeleton.vue";
import { ChevronsLeft, ChevronLeft, Ellipsis, ChevronRight, ChevronsRight } from "lucide-vue-next"
import PaginationButton from "./PaginationButton.vue";
import Pagination from "./Pagination.vue";

const props = defineProps({
  queryFn: {
    required: true,
  },
  idSelector: {
    type: Function,
    validator: v => typeof v === 'function',
    default: x => x.id ?? x,
  },
  onClick: {
    type: Function,
    default: null,
    required: false,
    validator: v => typeof v === 'function',
  },
})

const page = ref(1)
const pageSize = ref(10)

const {data, isPending, isFetching,} = props.queryFn({
  page: page.value,
  pageSize: pageSize.value,
})

const columns = ref([])

provide('tableManager', {
  register: (column) => {
    for (let i = 0; i < columns.value.length; i++) {
      if (columns.value[i].field === column.field) {
        columns.value[i] = column
        return
      }
    }

    columns.value.push(column)
  },
})

function getSkeletonWidth(rowIndex, cellIndex) {
  // Simple deterministic hash from indices
  const seed = (rowIndex * 31 + cellIndex * 17) % 100
  const min = 30 // %
  const max = 90 // %
  const width = min + (seed % (max - min))
  return width + '%'
}

</script>

<template>
  <Box class="px-0 py-0 overflow-x-hidden">
    <table class="w-full">
      <thead>
        <tr
            class="bg-emerald-600 text-slate-50"
        >
          <slot name="columns"/>
        </tr>

        <tr v-if="isPending || isFetching" class="bg-emerald-100 relative h-1">
          <td :colspan="columns.length" class="p-0">
            <div class="overflow-hidden h-1">
              <div class="loading-bar bg-emerald-300 h-1"></div>
            </div>
          </td>
        </tr>
      </thead>

      <tbody>
        <tr
            v-if="!!data"
            v-for="item in data.items"
            :key="props.idSelector(item)"
            class="hover:text-emerald-700 odd:bg-slate-50 even:bg-slate-100 hover:bg-emerald-100"
            :class="{'cursor-pointer': !!onClick}"
            @click="!!onClick && onClick(item)"
        >
          <slot name="row" :item="item"/>
        </tr>
        <tr v-if="!!data && data.items.length === 0">
          <td :colspan="columns.length" class="px-5 py-3 text-center">
            No data&hellip;
          </td>
        </tr>

        <tr
            v-if="isPending && !data"
            v-for="rowIndex in 5"
            :key="rowIndex"
            class="odd:bg-slate-50 even:bg-slate-100"
        >
          <td
              v-for="cellIndex in columns.length"
              :key="cellIndex"
              class="px-5 py-3"
          >
            <Skeleton
                :dep="undefined"
                class="h-4"
                :style="{
                  width: getSkeletonWidth(rowIndex, cellIndex)
                }"
            />
          </td>
        </tr>
      </tbody>

      <tfoot
          v-if="!!data && !!data.pagination"
          class="bg-slate-200 border-t border-slate-300"
      >
        <tr>
          <td :colspan="columns.length" class="px-5 py-3">
            <div class="flex justify-between items-center flex-wrap gap-5">
              <span class="text-sm text-slate-500">
                Showing <span class="text-slate-900">{{ data.items.length }}</span> out of <span class="text-slate-900">{{ data.pagination.totalItems }}</span> entries
              </span>
              <Pagination
                :total-pages="data.pagination.totalPages"
                :page="page"
                :page-size="pageSize"
                @pageChange="page = $event"
              />
            </div>
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