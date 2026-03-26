<script setup>

import {useRoute} from "vue-router";
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
import {useDeleteConfirm} from "../../../../../../composables/deleteConfirm.js";

const route = useRoute()
const deleteConfirm = useDeleteConfirm()

const {data} = useGetResourceServerQuery(
    route.params.vsName,
    route.params.projectSlug,
    route.params.resourceServerId,
)

const deleteResourceServer = useDeleteResourceServerMutation(route.params.vsName, route.params.projectSlug)

const onDelete = () => {
  deleteConfirm.confirm({
    title: 'Delete resource server',
    message: 'Are you sure you want to delete this resource server? This will also delete all its scopes.',
    mutation: deleteResourceServer,
    id: route.params.resourceServerId,
    navigateTo: {name: 'mgmt-resource-servers-overview', params: {vsName: route.params.vsName, projectSlug: route.params.projectSlug}},
    successMessage: 'Resource server deleted',
    errorMessage: 'Failed to delete resource server',
  })
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader :title="data?.name" subtitle="Manage resource server configuration and settings">
        <DotMenu>
          <MenuItem variant="danger" text="Delete" @click="onDelete"/>
        </DotMenu>
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
