<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import BoxContainer from "../../../../components/BoxContainer.vue";
import DataLayout from "../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../components/LoadingSkeleton.vue";
import VerifiedBadge from "../../../../components/VerifiedBadge.vue";
import KeylineButton from "../../../../components/KeylineButton.vue";
import ModalPopup from "../../../../components/ModalPopup.vue";
import KeylineForm from "../../../../components/KeylineForm.vue";
import KeylineInput from "../../../../components/KeylineInput.vue";
import CheckBox from "../../../../components/CheckBox.vue";
import {useRoute} from "vue-router";
import {useGetUserQuery, useUserMutation, useAdminResetPasswordMutation} from "../../../../api/user.js";
import {useToast} from "../../../../composables/toast.js";
import {reactive, ref, watch} from "vue";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import TabLayout from "../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../components/tabs/TabPage.vue";

const route = useRoute()
const toast = useToast()

const {data} = useGetUserQuery(
  route.params.vsName,
  route.params.userId,
)

const editModal = ref(null)
const emailModal = ref(null)
const passwordModal = ref(null)

const editForm = reactive({displayName: ''})
const editRules = {displayName: {required}}
const editV$ = useVuelidate(editRules, editForm)

const emailForm = reactive({email: '', emailVerified: false})
const emailRules = {email: {required, email}}
const emailV$ = useVuelidate(emailRules, emailForm)

const passwordForm = reactive({password: '', temporary: false})
const passwordRules = {password: {required}}
const passwordV$ = useVuelidate(passwordRules, passwordForm)

watch(data, (newData) => {
  if (newData) {
    editForm.displayName = newData.displayName || ''
    emailForm.email = newData.primaryEmail || ''
    emailForm.emailVerified = !!newData.emailVerified
  }
})

const updateUser = useUserMutation(route.params.vsName, route.params.userId)
const resetPassword = useAdminResetPasswordMutation(route.params.vsName)

const onEdit = () => {
  editV$.value.$reset()
  editModal.value.open()
}

const onEmailEdit = () => {
  emailV$.value.$reset()
  emailModal.value.open()
}

const onEditSubmit = async () => {
  try {
    await updateUser.mutateAsync({displayName: editForm.displayName})
    toast.success('User updated')
    editModal.value.close()
  } catch {
    toast.error('Failed to update user')
  }
}

const onEmailSubmit = async () => {
  try {
    await updateUser.mutateAsync({email: emailForm.email, emailVerified: emailForm.emailVerified})
    toast.success('Email updated')
    emailModal.value.close()
  } catch {
    toast.error('Failed to update email')
  }
}

const onResetPassword = () => {
  passwordForm.password = ''
  passwordForm.temporary = false
  passwordV$.value.$reset()
  passwordModal.value.open()
}

const onPasswordSubmit = async () => {
  try {
    await resetPassword.mutateAsync({
      userId: route.params.userId,
      password: passwordForm.password,
      temporary: passwordForm.temporary,
    })
    toast.success('Password reset')
    passwordModal.value.close()
  } catch {
    toast.error('Failed to reset password')
  }
}

</script>

<template>
  <ModalPopup ref="editModal">
    <KeylineForm title="Edit user"
                 @submit="onEditSubmit"
                 :vuelidate="editV$"
    >
      <KeylineInput label="Display name"
                    v-model="editV$.displayName.$model"
                    :vuelidate="editV$.displayName"
                    required
      />
    </KeylineForm>
  </ModalPopup>

  <ModalPopup ref="emailModal">
    <KeylineForm title="Edit email"
                 @submit="onEmailSubmit"
                 :vuelidate="emailV$"
    >
      <KeylineInput
        label="Email"
        type="email"
        v-model="emailV$.email.$model"
        :vuelidate="emailV$.email"
        required
      />
      <CheckBox
        class="mt-3"
        label="Email verified"
        v-model="emailForm.emailVerified"
      />
    </KeylineForm>
  </ModalPopup>

  <ModalPopup ref="passwordModal">
    <KeylineForm title="Reset password"
                 @submit="onPasswordSubmit"
                 :vuelidate="passwordV$"
    >
      <KeylineInput label="New password"
                    type="password"
                    v-model="passwordV$.password.$model"
                    :vuelidate="passwordV$.password"
                    required
      />
      <div class="flex items-center gap-2 mt-2">
        <input type="checkbox" id="temporary" v-model="passwordForm.temporary"
               class="rounded border-gray-300"/>
        <label for="temporary" class="text-sm">Temporary password (user must change on next login)</label>
      </div>
    </KeylineForm>
  </ModalPopup>

  <PageLayout>
    <template #header>
      <PageHeader title="User details"
                  subtitle="Manage user configuration and settings"
      />
    </template>

    <TabLayout>
      <TabPage title="General" name="general">
        <BoxContainer>
          <DataLayout title="Personal information">
            <template #actions>
              <KeylineButton @click="onEdit" text="Edit" variant="secondary" size="sm"/>
            </template>

            <DataLayoutItem title="Username">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.username }}
              </LoadingSkeleton>
            </DataLayoutItem>
            <DataLayoutItem title="Display name">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.displayName }}
              </LoadingSkeleton>
            </DataLayoutItem>
            <DataLayoutItem title="Type">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.isServiceUser ? 'Service user' : 'User' }}
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>

        <BoxContainer>
          <DataLayout title="Email">
            <template #actions>
              <KeylineButton @click="onEmailEdit" text="Edit" variant="secondary" size="sm"/>
            </template>

            <DataLayoutItem title="Primary email">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                <span class="text-sm">{{ data.primaryEmail }}</span>
                <VerifiedBadge
                  tooltip="Email verified"
                  anti-tooltip="Email not verified"
                  :verified="data.emailVerified"
                />
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>
      </TabPage>

      <TabPage title="Security" name="security">
        <BoxContainer>
          <DataLayout title="Password">
            <template #actions>
              <KeylineButton @click="onResetPassword" text="Reset password" variant="secondary" size="sm"/>
            </template>

            <DataLayoutItem title="Has password">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.hasPassword !== undefined ? (data.hasPassword ? 'Yes' : 'No') : 'Unknown' }}
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>

        <BoxContainer>
          <DataLayout title="2 Factor Authentication">
            <DataLayoutItem title="TOTP enrolled">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.hasTotpCredential !== undefined ? (data.hasTotpCredential ? 'Yes' : 'No') : 'Unknown' }}
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>

        <BoxContainer>
          <DataLayout title="Passkeys">
            <DataLayoutItem title="Passkeys enrolled">
              <LoadingSkeleton :dep="data" class="w-32 h-4">
                {{ data.passkeyCount !== undefined ? data.passkeyCount : 'Unknown' }}
              </LoadingSkeleton>
            </DataLayoutItem>
          </DataLayout>
        </BoxContainer>
      </TabPage>
    </TabLayout>

    <template #footer>
      <ModelMetadata :model="data"/>
    </template>
  </PageLayout>
</template>
