<script setup>

import Skeleton from "../../../components/Skeleton.vue";
import Heading from "../../../components/Heading.vue";
import Button from "../../../components/Button.vue";
import Avatar from "../../../components/Avatar.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import VerifiedBadge from "../../../components/VerifiedBadge.vue";
import Box from "../../../components/Box.vue";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import {reactive, ref, watch} from "vue";
import {useUserManager} from "../../../composables/userManager.js";
import {useUserMutation, useGetUserQuery} from "../../../api/user.js";
import {useRoute} from "vue-router";
import Modal from "../../../components/Modal.vue";
import Input from "../../../components/Input.vue";
import Form from "../../../components/Form.vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useToast} from "../../../composables/toast.js";
import {useI18n} from "vue-i18n";

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

const { isPending, isError, data, error } = useGetUserQuery(
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
  <Modal ref="userInfoModal">
    <Form :title="t('editPersonalInfo')"
          v-if="!isPending && !isError && data"
          @submit="onFormSubmit"
          :vuelidate="v$"
    >
      <Input :label="t('displayName')"
             v-model="v$.displayName.$model"
             :vuelidate="v$.displayName"
             required
      />
    </Form>
  </Modal>

  <Box>
    <div class="flex flex-row items-center gap-4">
      <Skeleton :dep="data" class="w-12 h-12">
        <Avatar :username="data.displayName"/>
      </Skeleton>
      <div class="flex flex-col gap-1">
        <Skeleton :dep="data" class="w-42 h-5">
          <Heading level="h3">{{ data.displayName }}</Heading>
        </Skeleton>
        <Skeleton :dep="data" class="w-32 h-4">
          <span class="text-sm text-gray-500">@{{ data.username }}</span>
        </Skeleton>
      </div>
    </div>
  </Box>

  <Box>
    <DataLayout :title="t('personalInfo')">
      <template #actions>
        <Button
            @click="onEditPersonalInfo"
            text="Edit"
            variant="secondary"
            size="sm"
        />
      </template>

      <DataLayoutItem :title="t('username')">
        <Skeleton :dep="data" class="w-32 h-4">
          {{data.username}}
        </Skeleton>
      </DataLayoutItem>
      <DataLayoutItem :title="t('displayName')">
        <Skeleton :dep="data" class="w-32 h-4">
          {{data.displayName}}
        </Skeleton>
      </DataLayoutItem>
    </DataLayout>
  </Box>

  <Box>
    <DataLayout :title="t('emailAddresses')">
      <template #actions>
        <Button
            @click="onEditEmail"
            text="Edit"
            variant="secondary"
            size="sm"
        />
      </template>

      <DataLayoutItem :title="t('primaryEmail')">
        <Skeleton :dep="data" class="w-32 h-4">
            <span class="text-sm">
              {{data.primaryEmail}}
            </span>
          <VerifiedBadge
              :tooltip="t('emailVerified')"
              :anti-tooltip="t('emailNotVerified')"
              :verified="data.emailVerified"
          />
        </Skeleton>
      </DataLayoutItem>
    </DataLayout>
  </Box>
</template>

<style scoped>

</style>