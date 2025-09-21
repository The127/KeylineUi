<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import Tabs from "../../../components/tabs/Tabs.vue";
import Tab from "../../../components/tabs/Tab.vue";
import GeneralTab from "./GeneralTab.vue";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import {useRoute} from "vue-router";
import {useGetVirtualServerQuery} from "../../../api/virtualServers.js";

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

    <Tabs>
      <Tab title="General">
        <GeneralTab/>
      </Tab>
      <Tab title="Email">
        TODO: email tab
      </Tab>
      <Tab title="Templates">
        TODO: templates tab
      </Tab>
    </Tabs>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>

<style scoped>

</style>