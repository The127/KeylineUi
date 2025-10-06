<script setup>

import {useRoute} from "vue-router";
import GridLayout from "../../../components/GridLayout.vue";
import DashboardItem from "../../../components/DashboardItem.vue";
import {templateTypes} from "./templateTypes.js";

const route = useRoute()

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