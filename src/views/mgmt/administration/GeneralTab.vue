<script setup>

import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import VerifiedBadge from "../../../components/VerifiedBadge.vue";
import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";
import BoxContainer from "../../../components/BoxContainer.vue";
import HeadingBar from "../../../components/HeadingBar.vue";
import {useRoute} from "vue-router";
import {useListPasswordRulesQuery} from "../../../api/passwordRules.js";
import NoContent from "../../../components/NoContent.vue";

const route = useRoute()

defineProps({
  data: {
    required: true,
  },
})

const {passwordRules} = useListPasswordRulesQuery(route.params.vsName)

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
      <DataLayoutItem title="Require 2FA">
        <LoadingSkeleton :dep="data" class="w-32 Self Registrationh-4">
          {{ data.require2fa ? 'Required' : 'Not required' }}
          <VerifiedBadge
              anti-tooltip="not required"
              tooltip="required"
              :verified="data.require2fa"
          />
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Require Email Verification">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.requireEmailVerification ? 'Required' : 'Not required' }}
          <VerifiedBadge
              anti-tooltip="not required"
              tooltip="required"
              :verified="data.requireEmailVerification"
          />
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="Password policies">
      <DataLayoutItem title="Rules" full-row>
        <NoContent :cond="!passwordRules?.items" message="No password policy rules configured.">
          TODO: show the rules that are configured
        </NoContent>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>
</template>

<style scoped>

</style>