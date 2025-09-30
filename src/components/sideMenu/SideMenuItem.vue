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
  <li>
    <RouterLink :to="to" activeClass="bg-slate-300">
      {{ text }}
    </RouterLink>
  </li>
</template>

<style scoped>

</style>