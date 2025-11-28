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
        px-3 py-2 rounded-md
        hover:inset-shadow-xs hover:bg-slate-200
      "
      activeClass="bg-offwhite border-slate-400 text-emerald-600 shadow-md"
  >
    <span>
      {{ text }}
    </span>
  </RouterLink>
</template>

<style scoped>

</style>