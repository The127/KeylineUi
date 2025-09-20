<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import Tab from "../../../../components/tabs/Tab.vue";
import Tabs from "../../../../components/tabs/Tabs.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import {useGetApplicationQuery} from "../../../../api/applications.js";
import {useRoute} from "vue-router";
import DotMenu from "../../../../components/DotMenu.vue";
import MenuItem from "../../../../components/menu/MenuItem.vue";
import {usePopup} from "../../../../composables/popup.js";
import Box from "../../../../components/Box.vue";
import DataLayout from "../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../components/dataLayout/DataLayoutItem.vue";
import Skeleton from "../../../../components/Skeleton.vue";

const route = useRoute()
const popupService = usePopup()

const { isPending, isError, data, error } = useGetApplicationQuery(
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
          title="Application details"
          subtitle="Manage application configuration and settings"
      >
        <DotMenu>
          <MenuItem variant="danger" text="Delete" @click="onDeleteApplication"/>
        </DotMenu>
      </PageHeader>
    </template>

    <Tabs>
      <Tab title="General">
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
            <DataLayoutItem title="Type">
              <Skeleton :dep="data" class="w-32 h-4">
                {{ data.type === 'public' ? 'Public' : 'Confidential' }}
              </Skeleton>
            </DataLayoutItem>
          </DataLayout>
        </Box>

        <Box>
          <DataLayout title="Redirect URIs">
            <DataLayoutItem title="Login Redirect URIs" full-row>
              <Skeleton :dep="data" class="w-32 h-4">
                <span v-for="uri in data.redirectUris" :key="uri">
                  {{ uri }}
                </span>
              </Skeleton>
            </DataLayoutItem>
          </DataLayout>
        </Box>
      </Tab>

      <Tab title="Roles">
        TODO: role tab
      </Tab>
    </Tabs>

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>