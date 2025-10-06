<script setup>

import {useRoute} from "vue-router";
import {useGetTemplateQuery} from "../../../../api/templates.js";
import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import LoadingSkeleton from "../../../../components/LoadingSkeleton.vue";
import {getTemplateInfo} from "../templateTypes.js";

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
      />
    </template>

    <LoadingSkeleton :dep="data" class="w-32 h-4">
      {{ data }}
    </LoadingSkeleton>

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>