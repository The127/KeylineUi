<script setup>

import DataLayout from "../../../../components/dataLayout/DataLayout.vue";
import BoxContainer from "../../../../components/BoxContainer.vue";
import DataLayoutItem from "../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../components/LoadingSkeleton.vue";

defineProps({
  data: {
    required: true,
  },
})

</script>

<template>
  <BoxContainer>
    <DataLayout title="Information">
      <DataLayoutItem title="Name">
        <LoadingSkeleton :dep="data" class="w-24 h-4">
          {{ data.name }}
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Description"  full-row>
        <LoadingSkeleton :dep="data" class="w-24 h-4">
          {{ data.description }}
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="Security">
      <DataLayoutItem title="Require MFA">
        <LoadingSkeleton :dep="data" class="w-24 h-4">
          {{ data.requireMfa }}
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Max Token Age">
        <LoadingSkeleton :dep="data" class="w-24 h-4">
          {{ data.maxTokenAge }}
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>
</template>

<style scoped>

</style>