<script setup>

</script>

<template>
  <button
      class="w-6 h-6 border text-sm disabled:text-slate-500 disabled:border-slate-500 disabled:bg-slate-300 hover:not-disabled:cursor-pointer hover:inset-shadow-2xs hover:bg-slate-500 border-slate-700 first:rounded-l-md last:rounded-r-md flex items-center justify-center"
      v-bind="$attrs"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>