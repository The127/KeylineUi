<script setup>


import CodeEditor from "simple-code-editor";
import {useDark} from "@vueuse/core";
import InfoEditModal from "./InfoEditModal.vue";
import PageLayout from "../../../../../../components/PageLayout.vue";
import PageHeader from "../../../../../../components/PageHeader.vue";
import DotMenu from "../../../../../../components/DotMenu.vue";
import MenuItem from "../../../../../../components/menu/MenuItem.vue";
import TabLayout from "../../../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../../../components/tabs/TabPage.vue";
import BoxContainer from "../../../../../../components/BoxContainer.vue";
import DataLayout from "../../../../../../components/dataLayout/DataLayout.vue";
import KeylineButton from "../../../../../../components/KeylineButton.vue";
import DataLayoutItem from "../../../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../../../components/LoadingSkeleton.vue";
import NoContent from "../../../../../../components/NoContent.vue";
import ModelMetadata from "../../../../../../components/ModelMetadata.vue";
import VerifiedBadge from "../../../../../../components/VerifiedBadge.vue";
import EditFormModal from "../../../../../../components/EditFormModal.vue";
import CheckBox from "../../../../../../components/CheckBox.vue";
import {computed, ref, toValue} from "vue";
import {
  useDeleteApplicationMutation,
  useGetApplicationQuery,
  usePatchApplicationMutation
} from "../../../../../../api/applications.js";
import {useToast} from "../../../../../../composables/toast.js";
import {useRoute} from "vue-router";
import {useDeleteConfirm} from "../../../../../../composables/deleteConfirm.js";
import {useFormModal} from "../../../../../../composables/formModal.js";


const route = useRoute()
const deleteConfirm = useDeleteConfirm()
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
  deleteConfirm.confirm({
    title: 'Delete application',
    message: 'Are you sure you want to delete this application?',
    mutation: deleteApplication,
    id: toValue(data).id,
    navigateTo: {name: 'mgmt-applications-overview', params: {vsName: route.params.vsName, projectSlug: route.params.projectSlug}},
    successMessage: 'Application deleted',
    errorMessage: 'Could not delete application',
  })
}

const onEditInfo = () => {
  infoEditModalEl.value.open()
}

const patchApp = usePatchApplicationMutation(route.params.vsName, route.params.projectSlug, route.params.appId)

const grantTypesEdit = useFormModal({
  fields: {deviceFlowEnabled: false},
  rules: {},
  onSubmit: (form) => patchApp.mutateAsync({deviceFlowEnabled: form.deviceFlowEnabled}),
  toastMessages: {success: 'Grant types updated', error: 'Failed to update grant types'},
})
const grantTypesEditModalRef = grantTypesEdit.modalRef
grantTypesEdit.syncFrom(data)

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

  <EditFormModal ref="grantTypesEditModalRef" title="Edit grant types" @submit="grantTypesEdit.submit">
    <CheckBox
        label="Device Flow"
        helper-text="Allows CLIs and smart-TV clients to use the OAuth 2.0 Device Authorization Grant (RFC 8628)."
        v-model="grantTypesEdit.validation.deviceFlowEnabled.$model"
    />
  </EditFormModal>

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

        <BoxContainer>
          <DataLayout title="Grant types">
            <template #actions>
              <KeylineButton
                  @click="grantTypesEdit.open(data)"
                  text="Edit"
                  variant="secondary"
                  size="sm"
              />
            </template>
            <DataLayoutItem title="Device Flow">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.deviceFlowEnabled ? 'Enabled' : 'Disabled' }}
                <VerifiedBadge anti-tooltip="disabled" tooltip="enabled" :verified="data.deviceFlowEnabled"/>
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>
      </TabPage>

      <TabPage title="Claims Mapping" name="claimsMapping">
        <!-- Script editor section -->
        <BoxContainer>
          <div class="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 class="text-base font-semibold text-slate-800 dark:text-slate-200">Script</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                A JavaScript function executed on every token grant. Must return a JSON object of custom claims.
              </p>
            </div>
            <div class="flex flex-row gap-2 shrink-0">
              <template v-if="editingScript">
                <KeylineButton text="Save" size="sm" @click="onSaveScript"/>
                <KeylineButton variant="secondary" text="Cancel" size="sm" @click="onCancelEdit"/>
              </template>
              <template v-else>
                <KeylineButton text="Edit" size="sm" @click="onEditScript"/>
                <KeylineButton variant="danger" text="Clear" size="sm" @click="onClearScript" v-if="data?.customClaimsMappingScript"/>
              </template>
            </div>
          </div>

          <LoadingSkeleton :dep="data">
            <div class="w-full claims-editor" :class="{ 'editing': editingScript }">
              <CodeEditor
                  v-if="editingScript"
                  width="100%"
                  min-height="280px"
                  border-radius="0.5rem"
                  :theme="editorTheme"
                  v-model="claimsMappingScript"
                  line-nums
              />
              <template v-else>
                <NoContent :cond="!data.customClaimsMappingScript">
                  <template #no-content>
                    <div class="flex flex-col items-center justify-center py-10 text-center">
                      <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-3">
                        <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
                        </svg>
                      </div>
                      <p class="text-sm font-medium text-slate-600 dark:text-slate-300">No script configured</p>
                      <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Click Edit to add a custom claims mapping script</p>
                    </div>
                  </template>
                  <CodeEditor
                      v-if="data.customClaimsMappingScript"
                      width="100%"
                      min-height="280px"
                      border-radius="0.5rem"
                      :theme="editorTheme"
                      v-model="data.customClaimsMappingScript"
                      read-only
                      line-nums
                  />
                </NoContent>
              </template>
            </div>
          </LoadingSkeleton>
        </BoxContainer>

        <!-- Reference section -->
        <BoxContainer>
          <h3 class="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">Reference</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The following variables are injected into the script context at execution time.
          </p>
          <div class="rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
            <div class="grid grid-cols-[auto_1fr] text-sm">
              <div class="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-b border-r border-slate-200 dark:border-slate-600 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">Variable</div>
              <div class="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">Description</div>

              <div class="px-4 py-3 border-b border-r border-slate-200 dark:border-slate-600 flex items-center">
                <code class="text-xs font-mono bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md">roles</code>
              </div>
              <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                Array of strings — the global roles assigned to the user
              </div>

              <div class="px-4 py-3 border-r border-slate-200 dark:border-slate-600 flex items-center">
                <code class="text-xs font-mono bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md">applicationRoles</code>
              </div>
              <div class="px-4 py-3 text-slate-600 dark:text-slate-300">
                Array of strings — the roles scoped to this application
              </div>
            </div>
          </div>
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
.claims-editor {
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.claims-editor.editing {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

:deep(.dark) .claims-editor {
  border-color: #475569;
}

:deep(.dark) .claims-editor.editing {
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
}
</style>