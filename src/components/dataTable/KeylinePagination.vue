<script setup>

import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis} from "lucide-vue-next";
import PaginationButton from "./PaginationButton.vue";
import {computed} from "vue";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['pageChange'])

const pagesBefore = computed(() => {
  return Math.min(2, props.page - 1)
})

const pagesAfter = computed(() => {
  return Math.min(2, props.totalPages - props.page)
})

</script>

<template>
  <div class="flex flex-row items-center">
    <PaginationButton
        :disabled="page === 1"
        @click="emit('pageChange', 1)"
    >
      <ChevronsLeft class="h-4 w-4"/>
    </PaginationButton>
    <PaginationButton
        :disabled="page === 1"
        @click="emit('pageChange', page - 1)"
    >
      <ChevronLeft class="h-4 w-4"/>
    </PaginationButton>
    <Ellipsis
        v-if="page > 3"
        class="h-4 w-4"
    />

    <template v-if="pagesBefore > 0">
      <PaginationButton
          v-for="i in pagesBefore"
          :key="i"
          @click="emit('pageChange', page - (pagesBefore - i + 1))"
      >
        {{ page - (pagesBefore - i + 1) }}
      </PaginationButton>
    </template>
    <PaginationButton
      class="bg-slate-50 text-slate-900"
    >
      {{ page }}
    </PaginationButton>
    <template v-if="pagesAfter > 0">
      <PaginationButton
          v-for="i in pagesAfter"
          :key="i"
          @click="emit('pageChange', page + i)"
      >
        {{ page + i }}
      </PaginationButton>
    </template>

    <Ellipsis
        v-if="page + 2 < totalPages"
        class="h-4 w-4"
    />
    <PaginationButton
        :disabled="page === totalPages"
        @click="emit('pageChange', page + 1)"
    >
      <ChevronRight class="h-4 w-4"/>
    </PaginationButton>
    <PaginationButton
        :disabled="page === totalPages"
        @click="emit('pageChange', totalPages)"
    >
      <ChevronsRight class="h-4 w-4"/>
    </PaginationButton>
  </div>
</template>

<style scoped>

</style>