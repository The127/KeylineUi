<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import {useRoute} from "vue-router";
import {useGetProjectQuery} from "../../../../api/projects.js";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import BoxContainer from "../../../../components/BoxContainer.vue";
import DataLayout from "../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../components/LoadingSkeleton.vue";
import TabLayout from "../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../components/tabs/TabPage.vue";

const route = useRoute()

const {data} = useGetProjectQuery(
    route.params.vsName,
    route.params.projectSlug,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="data?.name"
          subtitle="Manage project resources, configuration and settings"
      />
    </template>

    <TabLayout>
      <TabPage title="General" name="general">
        <BoxContainer>
          <DataLayout title="Information">
            <DataLayoutItem title="Name">
              <LoadingSkeleton :dep="data" class="w-32 h4">
                {{ data.name }}
              </LoadingSkeleton>
            </DataLayoutItem>
            <DataLayoutItem title="Slug">
              <LoadingSkeleton :dep="data" class="w-32 h4">
                {{ data.slug }}
              </LoadingSkeleton>
            </DataLayoutItem>
            <DataLayoutItem title="Description" full-row>
              <LoadingSkeleton :dep="data" class="w-full h4">
                {{ data.description }}
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>
      </TabPage>
      
      <TabPage title="Applications" name="application">
        TODO
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