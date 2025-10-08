<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import {useGetApplicationQuery} from "../../../../api/applications.js";
import {useRoute} from "vue-router";
import DotMenu from "../../../../components/DotMenu.vue";
import MenuItem from "../../../../components/menu/MenuItem.vue";
import {usePopup} from "../../../../composables/popup.js";
import DataLayout from "../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../components/dataLayout/DataLayoutItem.vue";
import TabLayout from "../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../components/tabs/TabPage.vue";
import LoadingSkeleton from "../../../../components/LoadingSkeleton.vue";
import BoxContainer from "../../../../components/BoxContainer.vue";
import NoContent from "../../../../components/NoContent.vue";

const route = useRoute()
const popupService = usePopup()

const {data} = useGetApplicationQuery(
    route.params.vsName,
    route.params.appId,
)

const onDeleteApplication = () => {
  console.log(popupService)
  popupService.confirm({
    title: 'Delete application',
    message: 'Are you sure you want to delete this application?',
    onConfirm: async () => {
      console.log('confirmed')
    },
  })
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="data?.name"
          subtitle="Manage application configuration and settings"
      >
        <DotMenu>
          <MenuItem variant="danger" text="Delete" @click="onDeleteApplication"/>
        </DotMenu>
      </PageHeader>
    </template>

    <TabLayout>
      <TabPage title="General" name="general">
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
            <DataLayoutItem title="Type">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.type === 'public' ? 'Public' : 'Confidential' }}
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>

        <BoxContainer>
          <DataLayout title="Redirect URIs">
            <DataLayoutItem title="Login Redirect URIs" full-row>
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                <NoContent :cond="data.redirectUris.length == 0">
                  <span v-for="uri in data.redirectUris" :key="uri">
                    {{ uri }}
                  </span>
                </NoContent>
              </LoadingSkeleton>
            </DataLayoutItem>
            <DataLayoutItem title="Post-Logout Redirect URIs" full-row>
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                <NoContent :cond="data.postLogoutRedirectUris.length == 0">
                  <span v-for="uri in data.postLogoutRedirectUris" :key="uri">
                    {{ uri }}
                  </span>
                </NoContent>
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>
      </TabPage>

      <TabPage title="Roles" name="roles">
        TODO: role tab
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