<script setup>

import {useRoute, useRouter} from "vue-router";
import {useGetResourceServerQuery, useDeleteResourceServerMutation} from "../../../../../../api/resourceServers.js";
import PageLayout from "../../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../../../components/ModelMetadata.vue";
import TabLayout from "../../../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../../../components/tabs/TabPage.vue";
import DotMenu from "../../../../../../components/DotMenu.vue";
import MenuItem from "../../../../../../components/menu/MenuItem.vue";
import GeneralTab from "./GeneralTab.vue";
import ScopesTab from "./ScopesTab.vue";
import {useToast} from "../../../../../../composables/toast.js";
import {usePopup} from "../../../../../../composables/popup.js";

const route = useRoute()
const router = useRouter()
const toast = useToast()
const popupService = usePopup()

const {data} = useGetResourceServerQuery(
    route.params.vsName,
    route.params.projectSlug,
    route.params.resourceServerId,
)

const deleteResourceServer = useDeleteResourceServerMutation(route.params.vsName, route.params.projectSlug)

const onDelete = () => {
  popupService.confirm({
    title: 'Delete resource server',
    message: 'Are you sure you want to delete this resource server? This will also delete all its scopes.',
    onConfirm: async () => {
      try {
        await deleteResourceServer.mutateAsync(route.params.resourceServerId)
        await router.push({
          name: 'mgmt-resource-servers-overview',
          params: {vsName: route.params.vsName, projectSlug: route.params.projectSlug}
        })
        toast.success('Resource server deleted')
      } catch (e) {
        toast.error('Failed to delete resource server')
      }
    }
  })
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="data?.name"
          subtitle="Manage resource server configuration and settings"
      >
        <template #actions>
          <DotMenu>
            <MenuItem variant="danger" text="Delete" @click="onDelete"/>
          </DotMenu>
        </template>
      </PageHeader>
    </template>

    <TabLayout>
      <TabPage title="General" name="general">
        <GeneralTab :data="data"/>
      </TabPage>
      <TabPage title="Scopes" name="scopes">
        <ScopesTab/>
      </TabPage>
    </TabLayout>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>

<style scoped>

</style>
