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

    <BoxContainer>
      <DataLayout title="Information">
        <DataLayoutItem title="Name">
          <LoadingSkeleton :dep="data" class="w-32 h-4">
            {{ data.name }}
          </LoadingSkeleton>
        </DataLayoutItem>
        <DataLayoutItem title="Description" full-row>
          <LoadingSkeleton :dep="data" class="w-32 h-4">
            {{ data.description }}
          </LoadingSkeleton>
        </DataLayoutItem>
      </DataLayout>
    </BoxContainer>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>

<style scoped>

</style>