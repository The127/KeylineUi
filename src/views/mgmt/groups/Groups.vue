<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Groups"
          subtitle="Manage groups"
      />
    </template>

    TODO
  </PageLayout>
</template>

<style scoped>

</style>