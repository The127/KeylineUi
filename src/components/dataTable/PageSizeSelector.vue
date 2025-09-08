<script setup>

const model = defineModel()

</script>

<template>
  <select
      v-model="model"
      class="border border-slate-500/50 rounded px-2 py-1 text-sm"
  >
    <option :value="5">5</option>
    <option :value="10">10</option>
    <option :value="20">20</option>
    <option :value="50">50</option>
    <option :value="100">100</option>
  </select>
</template>

<style scoped>

</style>