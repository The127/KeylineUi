<script setup>

import KeylineIcon from "../../components/icons/KeylineIcon.vue";
import Avatar from "../../components/Avatar.vue";
</script>

<template>
  <div class="flex flex-row gap-3 justify-between">
    <div class="flex flex-row gap-2 items-center">
      <KeylineIcon class="w-12 h-12"/> Keyline
    </div>
    <div>
      Search
    </div>
    <div>
      <Avatar username="Dark Arotte"/>
    </div>
  </div>
  <router-view />
</template>

<style scoped>

</style>