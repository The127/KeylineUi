<script setup>

import {useRoute} from "vue-router";
import {useGetRoleQuery} from "../../../../api/roles.js";
import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import Tabs from "../../../../components/tabs/Tabs.vue";
import Tab from "../../../../components/tabs/Tab.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";

const route = useRoute()

const { data } = useGetRoleQuery(
    route.params.vsName,
    route.params.roleId,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
        title="Role details"
        subtitle="Manage role configuration and settings"
      />
    </template>

    <Tabs>
      <Tab title="General">
        TODO: general tab
      </Tab>
      <Tab title="Security">
        TODO: security tab
      </Tab>
    </Tabs>

    {{ data }}

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>