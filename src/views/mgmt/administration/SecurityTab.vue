<script setup>

import BoxContainer from "../../../components/BoxContainer.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";

defineProps({
  data: {
    required: true,
  },
})

</script>

<template>
  <BoxContainer>
    <DataLayout title="Signing keys">
      <DataLayoutItem title="Signing Algorithm">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.signingAlgorithm }}
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>
</template>

<style scoped>

</style>