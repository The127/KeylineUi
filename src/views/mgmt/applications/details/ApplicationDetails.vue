<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import {useDeleteApplicationMutation, useGetApplicationQuery} from "../../../../api/applications.js";
import {useRoute, useRouter} from "vue-router";
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
import InfoEditModal from "./InfoEditModal.vue";
import {ref, toValue} from "vue";
import KeylineButton from "../../../../components/KeylineButton.vue";
import {useToast} from "../../../../composables/toast.js";

const route = useRoute()
const router = useRouter()
const popupService = usePopup()
const toast = useToast()

const infoEditModalEl = ref(null)

const {data} = useGetApplicationQuery(
    route.params.vsName,
    route.params.appId,
)

const deleteApplication = useDeleteApplicationMutation(
    route.params.vsName,
)

const onDeleteApplication = () => {
  popupService.confirm({
    title: 'Delete application',
    message: 'Are you sure you want to delete this application?',
    onConfirm: async () => {
      try {
        await deleteApplication.mutateAsync(toValue(data).id)
        router.push({name: 'mgmt-applications'})
        toast.success("Application deleted")
      } catch (e) {
        console.error(e)
        toast.error("Could not delete application")
      }
    },
  })
}

const onEditInfo = () => {
  infoEditModalEl.value.open()
}

</script>

<template>
  <InfoEditModal v-if="data" ref="infoEditModalEl" :data="data"/>

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
            <template #actions>
              <KeylineButton
                  @click="onEditInfo"
                  text="Edit"
                  variant="secondary"
                  size="sm"
              />
            </template>
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
            <DataLayoutItem title="Namespace">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.systemApplication ? 'System' : 'User' }}
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