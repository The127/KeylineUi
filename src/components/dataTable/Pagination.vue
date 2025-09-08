<script setup>

import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis} from "lucide-vue-next";
import PaginationButton from "./PaginationButton.vue";

</script>

<template>
  <div class="flex flex-row items-center gap-1">
    <PaginationButton>
      <ChevronsLeft class="h-4 w-4"/>
    </PaginationButton>
    <PaginationButton>
      <ChevronLeft class="h-4 w-4"/>
    </PaginationButton>
    <Ellipsis class="h-4 w-4"/>
    <PaginationButton>
      3
    </PaginationButton>
    <PaginationButton>
      4
    </PaginationButton>
    <PaginationButton>
      5
    </PaginationButton>
    <PaginationButton>
      6
    </PaginationButton>
    <PaginationButton>
      7
    </PaginationButton>
    <Ellipsis class="h-4 w-4"/>
    <PaginationButton>
      <ChevronRight class="h-4 w-4"/>
    </PaginationButton>
    <PaginationButton>
      <ChevronsRight class="h-4 w-4"/>
    </PaginationButton>
  </div>
</template>

<style scoped>

</style>