<script setup>

import KeylineIcon from "../../components/icons/KeylineIcon.vue";
</script>

<template>
  <div class="flex flex-row gap-3 justify-between">
    <div class="flex flex-row gap-2 items-center">
      <KeylineIcon class="w-12 h-12"/> Keyline
    </div>
    <div>
      User
    </div>
  </div>
  <router-view />
</template>

<style scoped>

</style>