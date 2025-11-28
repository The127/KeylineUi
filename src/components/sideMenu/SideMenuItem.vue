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
        px-3 py-2 bg-slate-50 border border-slate-200 rounded-md
        hover:inset-shadow-xs hover:text-emerald-600
      "
      activeClass="bg-slate-100 border-slate-400 text-emerald-500"
  >
    <span>
      {{ text }}
    </span>
  </RouterLink>
</template>

<style scoped>

</style>