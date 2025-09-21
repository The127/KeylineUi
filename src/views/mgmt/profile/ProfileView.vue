<script setup>

import PageHeader from "../../../components/PageHeader.vue";
import PageLayout from "../../../components/PageLayout.vue";
import {useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import {useUserManager} from "../../../composables/userManager.js";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import GeneralTab from "./GeneralTab.vue";
import TabLayout from "../../../components/tabs/TabLayout.vue";
import TabPage from "../../../components/tabs/TabPage.vue";
import BoxContainer from "../../../components/BoxContainer.vue";

const route = useRoute()
const userManager = useUserManager(route.params.vsName)

const { data } = useQuery({
  queryKey: ['profile'],
  queryFn: async () => {
    const user = await userManager.getUser()
    const response = await fetch(`http://127.0.0.1:8081/api/virtual-servers/${route.params.vsName}/users/${user.profile.sub}`)
    return response.json()
  }
})

const onEditPassword = () => {
  alert('Password')
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Profile"
          subtitle="Manage your account and personal information."
      />
    </template>

    <TabLayout>
      <TabPage title="General">
        <GeneralTab/>
      </TabPage>

      <TabPage title="Security">
        <BoxContainer>
          <DataLayout title="Password">
            <template #actions>
              <KeylineButton
                  @click="onEditPassword"
                  text="Edit"
                  variant="secondary"
                  size="sm"
              />
            </template>

            <DataLayoutItem title="Temporary">
              false
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>

        <BoxContainer>
          <DataLayout title="2 Factor Authentication">
            <template #actions>
              <KeylineButton
                  @click="onEditPassword"
                  text="Add"
                  variant="secondary"
                  size="sm"
              />
            </template>
          </DataLayout>
        </BoxContainer>

        <BoxContainer>
          <DataLayout title="Passkeys">
            <template #actions>
              <KeylineButton
                  @click="onEditPassword"
                  text="Add"
                  variant="secondary"
                  size="sm"
              />
            </template>
          </DataLayout>
        </BoxContainer>
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