<script setup>

import {useRoute} from "vue-router";
import {useGetResourceServerQuery} from "../../../../../../api/resourceServers.js";
import PageLayout from "../../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../../../components/ModelMetadata.vue";
import BoxContainer from "../../../../../../components/BoxContainer.vue";
import DataLayout from "../../../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../../../components/LoadingSkeleton.vue";
import TabLayout from "../../../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../../../components/tabs/TabPage.vue";
import GeneralTab from "./GeneralTab.vue";
import ScopesTab from "./ScopesTab.vue";

const route = useRoute()

const { data } = useGetResourceServerQuery(
    route.params.vsName,
    route.params.projectSlug,
    route.params.resourceServerId,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="data?.name"
          subtitle="Manage resource server configuration and settings"
      />
    </template>

    <TabLayout>
      <TabPage title="General" name="general">
        <GeneralTab :data="data"/>
      </TabPage>
      <TabPage title="Scopes" name="scopes">
        <ScopesTab/>
      </TabPage>
    </TabLayout>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>

<style scoped>

</style>