<script setup>

import {useRoute} from "vue-router";
import {useGetTemplateQuery} from "../../../../api/templates.js";
import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import LoadingSkeleton from "../../../../components/LoadingSkeleton.vue";
import {getTemplateInfo} from "../templateTypes.js";
import DataLayout from "../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../components/dataLayout/DataLayoutItem.vue";
import BoxContainer from "../../../../components/BoxContainer.vue";

const route = useRoute()

const {data} = useGetTemplateQuery(
    route.params.vsName,
    route.params.templateType,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="getTemplateInfo(route.params.templateType).title"
          :subtitle="getTemplateInfo(route.params.templateType).subtitle"
      />
    </template>

    <BoxContainer>
      <DataLayout title="Template">
        <DataLayoutItem title="Text" full-row>
          <LoadingSkeleton :dep="data" class="w-32 h-4">
            <p class="border border-slate-200 p-2 rounded-md w-full">
              {{ data.text }}
            </p>
          </LoadingSkeleton>
        </DataLayoutItem>
      </DataLayout>
    </BoxContainer>

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>