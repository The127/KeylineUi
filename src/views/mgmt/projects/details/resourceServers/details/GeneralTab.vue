<script setup>

import DataLayoutItem from "../../../../../../components/dataLayout/DataLayoutItem.vue";
import DataLayout from "../../../../../../components/dataLayout/DataLayout.vue";
import LoadingSkeleton from "../../../../../../components/LoadingSkeleton.vue";
import BoxContainer from "../../../../../../components/BoxContainer.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <BoxContainer>
    <DataLayout title="Information">
      <DataLayoutItem title="Slug">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.slug }}
        </LoadingSkeleton>
      </DataLayoutItem>
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
</template>

<style scoped>

</style>