<script setup>
import KeylineIcon from "../components/icons/KeylineIcon.vue";
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 sm:grid sm:place-items-center">
      <div class="bg-slate-100 px-13 py-8 sm:rounded-2xl shadow-2xl sm:w-xl">
        <slot/>
      </div>
    </div>
    <footer class="bg-slate-100 px-8 py-5 flex flex-row flex-wrap justify-end">
      <span class="flex flex-row flex-wrap items-center gap-1 justify-baseline">
        <KeylineIcon class="w-6 h-6"/>
        <span class="text-slate-500">Powered by</span>
        <a href="https://github.com/the127/keyline" class="link">
          keyline
        </a>
      </span>
    </footer>
  </div>
</template>

<style scoped>

</style>