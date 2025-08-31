<script setup>

import PageHeader from "../../components/PageHeader.vue";
import PageLayout from "../../components/PageLayout.vue";
</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader title="Profile"/>
    </template>
    Dummy content
    <template #footer>
      Footer content
    </template>
  </PageLayout>
</template>

<style scoped>

</style>