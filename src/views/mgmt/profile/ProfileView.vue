<script setup>

import PageHeader from "../../../components/PageHeader.vue";
import PageLayout from "../../../components/PageLayout.vue";
import {useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import {useUserManager} from "../../../composables/userManager.js";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import GeneralTab from "./GeneralTab.vue";
import TabLayout from "../../../components/tabs/TabLayout.vue";
import TabPage from "../../../components/tabs/TabPage.vue";
import {ConfigApiUrl} from "../../../config.js";
import SecurityTab from "./SecurityTab.vue";
import {apiFetch} from "../../../api/index.js";

const route = useRoute()
const userManager = useUserManager(route.params.vsName)

const { data } = useQuery({
  queryKey: ['profile'],
  queryFn: async () => {
    const user = await userManager.getUser()
    return await apiFetch(ConfigApiUrl() + `/api/virtual-servers/${route.params.vsName}/users/${user.profile.sub}`, {
      vsName: route.params.vsName,
    })
  }
})


</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Profile"
          subtitle="Manage your account and personal information."
      />
    </template>

    <TabLayout>
      <TabPage title="General" name="general">
        <GeneralTab/>
      </TabPage>

      <TabPage title="Security" name="security">
        <SecurityTab />
      </TabPage>
    </TabLayout>

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>