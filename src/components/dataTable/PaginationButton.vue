<script setup>

</script>

<template>
  <button
      class="w-8 h-8 text-sm rounded-md
        disabled:text-slate-300 disabled:cursor-default
        hover:not-disabled:cursor-pointer hover:not-disabled:bg-emerald-50 hover:not-disabled:text-emerald-700
        text-slate-500 bg-transparent
        flex items-center justify-center transition-colors"
      v-bind="$attrs"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>