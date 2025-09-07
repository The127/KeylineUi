<script setup>

import {useRoute} from "vue-router";
import {useProfileQuery} from "../../../api/user.js";
import {useListApplicationQuery} from "../../../api/applications.js";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";

const route = useRoute()

const { isPending, isError, data, error } = useListApplicationQuery(
    route.params.vsName,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Applications"
          subtitle="Manage applications"
      />
    </template>

    <table v-if="!isPending">
      <tr>
        <th>
          Name
        </th>
        <th>
          Display Name
        </th>
      </tr>
      <tr v-for="app in data.items" :key="app.name">
        <td>
          {{ app.name }}
        </td>
        <td>
          {{ app.displayName }}
        </td>
      </tr>
    </table>
  </PageLayout>
</template>

<style scoped>

</style>