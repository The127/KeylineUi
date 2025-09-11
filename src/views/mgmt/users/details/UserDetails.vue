<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import Tabs from "../../../../components/tabs/Tabs.vue";
import Tab from "../../../../components/tabs/Tab.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import {useRoute} from "vue-router";
import {useGetUserQuery} from "../../../../api/user.js";

const route = useRoute()

const { isPending, isError, data, error } = useGetUserQuery(
    route.params.vsName,
    route.params.userId,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader title="User details"
                  subtitle="Manage user configuration and settings"
      />
    </template>

    <Tabs>
      <Tab title="General">
        TODO: general tab
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