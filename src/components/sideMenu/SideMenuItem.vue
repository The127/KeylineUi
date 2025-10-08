<script setup>

defineProps({
  text: {
    type: String,
    required: true,
  },
  to: {
    required: true,
  },
})

</script>

<template>
  <RouterLink :to="to"  class="px-3 py-2 bg-slate-100 border border-slate-300" activeClass="bg-slate-300">
    <span >
      {{ text }}
    </span>
  </RouterLink>
</template>

<style scoped>

</style>