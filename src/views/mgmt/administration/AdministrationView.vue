<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import GeneralTab from "./GeneralTab.vue";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import {useRoute} from "vue-router";
import {useGetVirtualServerQuery} from "../../../api/virtualServers.js";
import TabLayout from "../../../components/tabs/TabLayout.vue";
import TabPage from "../../../components/tabs/TabPage.vue";

const route = useRoute()

const { data } = useGetVirtualServerQuery(
    route.params.vsName,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Administration"
          subtitle="Manage this instance of keyline"
      />
    </template>

    <TabLayout>
      <TabPage title="General">
        <GeneralTab/>
      </TabPage>
      <TabPage title="Email">
        TODO: email tab
      </TabPage>
      <TabPage title="Templates">
        TODO: templates tab
      </TabPage>
    </TabLayout>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>

<style scoped>

</style>