<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import Tab from "../../../../components/tabs/Tab.vue";
import Tabs from "../../../../components/tabs/Tabs.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";



</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Application details"
          subtitle="Manage application configuration and settings"
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

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>