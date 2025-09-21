<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import {useRoute} from "vue-router";
import {useGetUserQuery} from "../../../../api/user.js";
import TabLayout from "../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../components/tabs/TabPage.vue";

const route = useRoute()

const {data } = useGetUserQuery(
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

    <TabLayout>
      <TabPage title="General">
        TODO: general tab
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