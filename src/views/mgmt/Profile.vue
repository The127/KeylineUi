<script setup>

import PageHeader from "../../components/PageHeader.vue";
import PageLayout from "../../components/PageLayout.vue";
import {useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import {useUserManager} from "../../composables/userManager.js";

const route = useRoute()
const userManager = useUserManager(route.params.vsName)

const { isPending, isError, data, error } = useQuery({
  queryKey: ['profile'],
  queryFn: async () => {
    const user = await userManager.getUser()
    const response = await fetch(`http://127.0.0.1:8081/api/virtual-servers/${route.params.vsName}/users/${user.profile.sub}`)
    return response.json()
  }
})

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader title="Profile"/>
    </template>
    <div>
      <template v-if="!isPending && !isError && data">
      {{ data }}
      </template>
    </div>
    <template #footer>
      Footer content
    </template>
  </PageLayout>
</template>

<style scoped>

</style>