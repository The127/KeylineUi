<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col gap-5 px-5 py-5">
    <slot name="header"/>
    <slot/>
    <slot name="footer"/>
  </div>
</template>

<style scoped>

</style>