<script setup>

import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import VerifiedBadge from "../../../components/VerifiedBadge.vue";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import {reactive, ref, watch} from "vue";
import {useUserManager} from "../../../composables/userManager.js";
import {useUserMutation, useGetUserQuery} from "../../../api/user.js";
import {useRoute} from "vue-router";
import KeylineInput from "../../../components/KeylineInput.vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useToast} from "../../../composables/toast.js";
import {useI18n} from "vue-i18n";
import UserAvatar from "../../../components/UserAvatar.vue";
import BoxContainer from "../../../components/BoxContainer.vue";
import ModalPopup from "../../../components/ModalPopup.vue";
import KeylineForm from "../../../components/KeylineForm.vue";
import HeadingText from "../../../components/HeadingText.vue";
import KeylineButton from "../../../components/KeylineButton.vue";

const { t } = useI18n({
  messages: {
    en: {
      personalInfo: 'Personal information',
      username: 'Username',
      displayName: 'Display name',
      emailAddresses: 'Email addresses',
      primaryEmail: 'Primary email',
      emailVerified: 'Email verified',
      emailNotVerified: 'Email not verified',
      editPersonalInfo: 'Edit personal information',
      profileUpdated: 'Profile updated',
      failedToUpdateProfile: 'Failed to update profile',
    },
    de: {
      personalInfo: 'Persönliche Informationen',
      username: 'Benutzername',
      displayName: 'Anzeigename',
      emailAddresses: 'E-Mail Adressen',
      primaryEmail: 'Primäre E-Mail',
      emailVerified: 'E-Mail verifiziert',
      emailNotVerified: 'E-Mail nicht verifiziert',
      editPersonalInfo: 'Persönliche Informationen bearbeiten',
      profileUpdated: 'Profil aktualisiert',
      failedToUpdateProfile: 'Profil konnte nicht aktualisiert werden',
    },
  },
  inheritLocale: true,
})

const toast = useToast()
const userInfoModal = ref(null)
const route = useRoute()
const userManager = useUserManager(route.params.vsName)

const { isPending, isError, data } = useGetUserQuery(
    route.params.vsName,
    (await userManager.getUser()).profile.sub,
)

const onEditPersonalInfo = () => {
  userInfoModal.value.open()
}

const onEditEmail = () => {
  alert('Edit email')
}

const formModel = reactive({
  displayName: '',
})

const formRules = {
  displayName: { required, },
}

const v$ = useVuelidate(formRules, formModel)

watch(data, (newData) => {
  if (newData) {
    formModel.displayName = newData.displayName || ''
  }
})

const updateProfile = useUserMutation(
    route.params.vsName,
    (await userManager.getUser()).profile.sub,
)

const onFormSubmit = async () => {
  try{
    await updateProfile.mutateAsync({
      displayName: formModel.displayName,
    })
    toast.success(t('profileUpdated'))
  } catch (e) {
    console.error(e)
    toast.error(t('failedToUpdateProfile'))
  }
  userInfoModal.value.close()
}

</script>

<template>
  <ModalPopup ref="userInfoModal">
    <KeylineForm :title="t('editPersonalInfo')"
          v-if="!isPending && !isError && data"
          @submit="onFormSubmit"
          :vuelidate="v$"
    >
      <KeylineInput :label="t('displayName')"
             v-model="v$.displayName.$model"
             :vuelidate="v$.displayName"
             required
      />
    </KeylineForm>
  </ModalPopup>

  <BoxContainer>
    <div class="flex flex-row items-center gap-4">
      <LoadingSkeleton :dep="data" class="w-12 h-12">
        <UserAvatar :username="data.displayName"/>
      </LoadingSkeleton>
      <div class="flex flex-col gap-1">
        <LoadingSkeleton :dep="data" class="w-42 h-5">
          <HeadingText level="h3">{{ data.displayName }}</HeadingText>
        </LoadingSkeleton>
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          <span class="text-sm text-gray-500">@{{ data.username }}</span>
        </LoadingSkeleton>
      </div>
    </div>
  </BoxContainer>

  <BoxContainer>
    <DataLayout :title="t('personalInfo')">
      <template #actions>
        <KeylineButton
            @click="onEditPersonalInfo"
            text="Edit"
            variant="secondary"
            size="sm"
        />
      </template>

      <DataLayoutItem :title="t('username')">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{data.username}}
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem :title="t('displayName')">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{data.displayName}}
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout :title="t('emailAddresses')">
      <template #actions>
        <KeylineButton
            @click="onEditEmail"
            text="Edit"
            variant="secondary"
            size="sm"
        />
      </template>

      <DataLayoutItem :title="t('primaryEmail')">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
            <span class="text-sm">
              {{data.primaryEmail}}
            </span>
          <VerifiedBadge
              :tooltip="t('emailVerified')"
              :anti-tooltip="t('emailNotVerified')"
              :verified="data.emailVerified"
          />
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>
</template>

<style scoped>

</style>