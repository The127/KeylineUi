<script setup>

import PageHeader from "../../components/PageHeader.vue";
import PageLayout from "../../components/PageLayout.vue";
import {useMutation, useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import {useUserManager} from "../../composables/userManager.js";
import Form from "../../components/Form.vue";
import Input from "../../components/Input.vue";
import {reactive, watch} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ModelMetadata from "../../components/ModelMetadata.vue";
import {useToast} from "../../composables/toast.js";
import Box from "../../components/Box.vue";
import Avatar from "../../components/Avatar.vue";
import Heading from "../../components/Heading.vue";
import Button from "../../components/Button.vue";

const toast = useToast()
const route = useRoute()
const userManager = useUserManager(route.params.vsName)

const { isPending, isError, data, error } = useQuery({
  queryKey: ['profile'],
  queryFn: async () => {
    const user = await userManager.getUser()
    const response = await fetch(`http://127.0.0.1:8081/api/virtual-servers/${route.params.vsName}/users/${user.profile.sub}`)
    return response.json()
  }
})

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

const updateProfile = useMutation({
  mutationFn: async (data) => {
    const user = await userManager.getUser()
    await fetch(`http://127.0.0.1:8081/api/virtual-servers/${route.params.vsName}/users/${user.profile.sub}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
})

const onFormSubmit = async () => {
  try{
    await updateProfile.mutateAsync({
      displayName: formModel.displayName,
    })

    toast.success('Profile updated')
  } catch {
    toast.error('Failed to update profile')
  }
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Profile"
          subtitle="Manage your profile and settings"
      />
    </template>
    <ModelMetadata
        v-if="!isPending && !isError && data"
        :model="data"
    />
    <Box v-if="!isPending && !isError && data">
      <div class="flex flex-row items-center gap-4">
        <Avatar :username="data.displayName"/>
        <div class="flex flex-col">
          <Heading level="h3">{{ data.displayName }}</Heading>
          <span class="text-sm text-gray-500">@{{ data.username }}</span>
        </div>
      </div>
    </Box>
    <Box v-if="!isPending && !isError && data">
      <div class="flex flex-row justify-between items-center gap-4 flex-wrap">
        <Heading level="h3">Personal information</Heading>
        <Button text="Edit" variant="secondary" size="sm"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <span class="text-sm text-gray-500">
            Username
          </span>
          <span class="text-sm ">
            {{data.username}}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm text-gray-500">
            Display name
          </span>
          <span class="text-sm ">
            {{data.displayName}}
          </span>
        </div>
      </div>
    </Box>
    <Box>
      <div class="flex flex-row justify-between items-center gap-4 flex-wrap">
        <Heading level="h3">Email</Heading>
        <Button text="Edit" variant="secondary" size="sm"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <span class="text-sm text-gray-500">
            Primary email
          </span>
          <span class="text-sm ">
            {{data.primaryEmail}}
          </span>
        </div>
      </div>
    </Box>
    <template #footer>
      Footer content
    </template>
  </PageLayout>
</template>

<style scoped>

</style>