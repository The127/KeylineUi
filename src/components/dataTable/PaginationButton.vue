<script setup>

</script>

<template>
  <button
      class="w-7 h-7 border text-sm
        disabled:text-slate-400 disabled:border-slate-400
        hover:not-disabled:cursor-pointer hover:not-disabled:underline
        hover:not-disabled:text-slate-900 hover:not-disabled:bg-slate-100
        border-slate-500/50
        text-slate-500
        first:rounded-l-md last:rounded-r-md not-last:border-r-0
        flex items-center justify-center"
      v-bind="$attrs"
  >
    <slot/>
  </button>
</template>

<style scoped>

</style>