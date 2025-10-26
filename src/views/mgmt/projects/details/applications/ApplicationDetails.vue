<script setup>


import CodeEditor from "simple-code-editor";
import {useDark} from "@vueuse/core";
import InfoEditModal from "./InfoEditModal.vue";
import PageLayout from "../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../components/PageHeader.vue";
import DotMenu from "../../../../../components/DotMenu.vue";
import MenuItem from "../../../../../components/menu/MenuItem.vue";
import TabLayout from "../../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../../components/tabs/TabPage.vue";
import BoxContainer from "../../../../../components/BoxContainer.vue";
import DataLayout from "../../../../../components/dataLayout/DataLayout.vue";
import KeylineButton from "../../../../../components/KeylineButton.vue";
import DataLayoutItem from "../../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton.vue";
import NoContent from "../../../../../components/NoContent.vue";
import ModelMetadata from "../../../../../components/ModelMetadata.vue";
import {computed, ref, toValue} from "vue";
import {
  useDeleteApplicationMutation,
  useGetApplicationQuery,
  usePatchApplicationMutation
} from "../../../../../api/applications.js";
import {useToast} from "../../../../../composables/toast.js";
import {useRoute, useRouter} from "vue-router";
import {usePopup} from "../../../../../composables/popup.js";

const route = useRoute()
const router = useRouter()
const popupService = usePopup()
const toast = useToast()
const isDark = useDark()

const infoEditModalEl = ref(null)

const {data} = useGetApplicationQuery(
    route.params.vsName,
    route.params.projectSlug,
    route.params.appId,
)

const deleteApplication = useDeleteApplicationMutation(
    route.params.vsName,
    route.params.projectSlug,
)

const onDeleteApplication = () => {
  popupService.confirm({
    title: 'Delete application',
    message: 'Are you sure you want to delete this application?',
    onConfirm: async () => {
      try {
        await deleteApplication.mutateAsync(toValue(data).id)
        await router.push({name: 'mgmt-applications'})
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

const patchApp = usePatchApplicationMutation(route.params.vsName, route.params.projectSlug, route.params.appId)

const editingScript = ref(false)
const claimsMappingScript = ref("")

const editorTheme = computed(() => {
  return isDark.value ? "github-dark" : "github"
})

const onEditScript = () => {
  claimsMappingScript.value = data.value.customClaimsMappingScript ?? ""
  editingScript.value = true
}

const onCancelEdit = () => {
  editingScript.value = false
}

const onSaveScript = async () => {
  await patchApp.mutateAsync({customClaimsMappingScript: claimsMappingScript.value})
  editingScript.value = false
}

const onClearScript = async () => {
  await patchApp.mutateAsync({customClaimsMappingScript: ""})
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

      <TabPage title="Claims Mapping" name="claimsMapping">
        <BoxContainer>
          <DataLayout title="Custom Claims Mapping">
            <DataLayoutItem title="Explanation" full-row>
              Keyline allows users to configure the claims mapping per application via the script shown below.
              It is executed everytime an access token is generated for the application.
              The script must return a json object containing the desired claims.
            </DataLayoutItem>

            <DataLayoutItem title="Script" full-row>
              <LoadingSkeleton :dep="data">
                <div class="flex flex-col gap-3 w-full">
                  <CodeEditor  v-if="editingScript" width="100%" :theme="editorTheme" v-model="claimsMappingScript"/>
                  <template v-else>
                    <NoContent :cond="!data.customClaimsMappingScript" message="No claims mapping script configured.">
                      <CodeEditor v-if="data.customClaimsMappingScript" width="100%" :theme="editorTheme" v-model="data.customClaimsMappingScript" read-only/>
                    </NoContent>
                  </template>
                  <div class="flex flex-row gap-3">
                    <template v-if="editingScript">
                      <KeylineButton text="Save" @click="onSaveScript"/>
                      <KeylineButton variant="secondary" text="Cancel" @click="onCancelEdit"/>
                    </template>
                    <template v-else>
                      <KeylineButton text="Edit" @click="onEditScript"/>
                      <KeylineButton variant="danger" text="Clear" @click="onClearScript"/>
                    </template>
                  </div>
                </div>
              </LoadingSkeleton>
            </DataLayoutItem>

            <DataLayoutItem title="Available variables" full-row>
              <div class="flex flex-col gap-3">
                <span>The following variables are available in custom claims mapping scripts:</span>
                <div class="flex flex-col gap-1">
                  <span>roles - an array of strings containing the global roles of the user</span>
                  <span>applicationRoles - an array of strings containing the applicatoin roles of the user</span>
                </div>
              </div>
            </DataLayoutItem>
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