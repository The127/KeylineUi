<script setup>

import {useGetVirtualServerQuery} from "../../../api/virtualServers.js";
import {useRoute} from "vue-router";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import Skeleton from "../../../components/Skeleton.vue";
import Box from "../../../components/Box.vue";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import VerifiedBadge from "../../../components/VerifiedBadge.vue";

const route = useRoute()

const { data } = useGetVirtualServerQuery(
    route.params.vsName,
)

</script>

<template>
  <Box>
    <DataLayout title="Information">
      <DataLayoutItem title="Name">
        <Skeleton :dep="data" class="w-32 h-4">
          {{ data.name }}
        </Skeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Display Name">
        <Skeleton :dep="data" class="w-32 h-4">
          {{ data.displayName }}
        </Skeleton>
      </DataLayoutItem>
    </DataLayout>
  </Box>

  <Box>
    <DataLayout title="Login and Registration">
      <DataLayoutItem title="Self Registration">
        <Skeleton :dep="data" class="w-32 h-4">
          {{ data.registrationEnabled ? 'Enabled' : 'Disabled' }}
          <VerifiedBadge
              anti-tooltip="disabled"
              tooltip="enabled"
              :verified="data.registrationEnabled"
          />
        </Skeleton>
      </DataLayoutItem>
    </DataLayout>
  </Box>
</template>

<style scoped>

</style>