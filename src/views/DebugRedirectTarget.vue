<script setup lang="ts">

import {useRoute} from "vue-router";

const route = useRoute()

</script>

<template>
  Login Flow completed, got code: {{ route.query.code }}
</template>

<style scoped>

</style>