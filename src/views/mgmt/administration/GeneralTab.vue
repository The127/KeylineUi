<script setup>

import {useGetVirtualServerQuery} from "../../../api/virtualServers.js";
import {useRoute} from "vue-router";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import VerifiedBadge from "../../../components/VerifiedBadge.vue";
import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";
import BoxContainer from "../../../components/BoxContainer.vue";

const route = useRoute()

const { data } = useGetVirtualServerQuery(
    route.params.vsName,
)

</script>

<template>
  <BoxContainer>
    <DataLayout title="Information">
      <DataLayoutItem title="Name">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.name }}
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Display Name">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.displayName }}
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="Login and Registration">
      <DataLayoutItem title="Self Registration">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.registrationEnabled ? 'Enabled' : 'Disabled' }}
          <VerifiedBadge
              anti-tooltip="disabled"
              tooltip="enabled"
              :verified="data.registrationEnabled"
          />
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>
</template>

<style scoped>

</style>