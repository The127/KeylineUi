<script setup>

import {useRoute} from "vue-router";
import {useProfileQuery} from "../../../api/user.js";
import {useListApplicationQuery} from "../../../api/applications.js";

const route = useRoute()

const { isPending, isError, data, error } = useListApplicationQuery(
    route.params.vsName,
)

</script>

<template>
  Applications View
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
</template>

<style scoped>

</style>