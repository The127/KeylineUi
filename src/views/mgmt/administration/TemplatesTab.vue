<script setup>

import {useRoute} from "vue-router";
import GridLayout from "../../../components/GridLayout.vue";
import DashboardItem from "../../../components/DashboardItem.vue";

const route = useRoute()

const templateTypes = [
  {
    type: "email_verification",
    title: "Email Verification",
    subtitle: "Send when an email verification is requested.",
  },
]

</script>

<template>
  <GridLayout>
    <DashboardItem v-for="type in templateTypes"
                   :key="type.type"
                   :title="type.title"
                   :subtitle="type.subtitle"
                   :to="{name: 'mgmt-template-details', params: {...route.params, templateType: type.type},}"
    />
  </GridLayout>
</template>

<style scoped>

</style>