<script setup>

import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import GeneralTab from "./GeneralTab.vue";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import {useRoute} from "vue-router";
import {useGetVirtualServerQuery} from "../../../api/virtualServers.js";
import TabLayout from "../../../components/tabs/TabLayout.vue";
import TabPage from "../../../components/tabs/TabPage.vue";
import TemplatesTab from "./TemplatesTab.vue";
import SecurityTab from "./SecurityTab.vue";
import AuditTab from "./AuditTab.vue";

const route = useRoute()

const {data} = useGetVirtualServerQuery(
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
      <TabPage title="General" name="general">
        <GeneralTab :data="data"/>
      </TabPage>
      <TabPage title="Email" name="email">
        TODO: email tab
      </TabPage>
      <TabPage title="Security" name="security">
        <SecurityTab :data="data"/>
      </TabPage>
      <TabPage title="Templates" name="templates">
        <TemplatesTab/>
      </TabPage>
      <TabPage title="Audit" name="audit">
        <AuditTab/>
      </TabPage>
    </TabLayout>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>

<style scoped>

</style>