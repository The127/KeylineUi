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
  <RouterLink
      :to="to"
      class="
        px-3 py-2 rounded-md text-slate-600 font-medium text-sm
        hover:text-slate-900 hover:bg-slate-200/60
        transition-colors
      "
      activeClass="!bg-emerald-50 !text-emerald-700 border-l-3 border-emerald-600 !pl-2.5"
  >
    {{ text }}
  </RouterLink>
</template>

<style scoped>

</style>