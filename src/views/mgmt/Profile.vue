<script setup>

import PageHeader from "../../components/PageHeader.vue";
import PageLayout from "../../components/PageLayout.vue";
import {useMutation, useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import {useUserManager} from "../../composables/userManager.js";
import {reactive, watch} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ModelMetadata from "../../components/ModelMetadata.vue";
import {useToast} from "../../composables/toast.js";
import Box from "../../components/Box.vue";
import Avatar from "../../components/Avatar.vue";
import Heading from "../../components/Heading.vue";
import Button from "../../components/Button.vue";
import VerifiedBadge from "../../components/VerifiedBadge.vue";
import DataLayout from "../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../components/dataLayout/DataLayoutItem.vue";
import Skeleton from "../../components/Skeleton.vue";


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

const onEditPersonalInfo = () => {
  alert('Edit personal info')
}

const onEditEmail = () => {
  alert('Edit email')
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
     <DataLayout title="Personal information">
       <template #actions>
         <Button
             @click="onEditPersonalInfo"
             text="Edit"
             variant="secondary"
             size="sm"
         />
       </template>

       <DataLayoutItem title="Username">
         <Skeleton :dep="data" class="w-32 h-4">
          {{data.username}}
         </Skeleton>
       </DataLayoutItem>
        <DataLayoutItem title="Display name">
          <Skeleton :dep="data" class="w-32 h-4">
            {{data.displayName}}
          </Skeleton>
        </DataLayoutItem>
     </DataLayout>
    </Box>

    <Box>
      <DataLayout title="Email adresses">
        <template #actions>
          <Button
              @click="onEditEmail"
              text="Edit"
              variant="secondary"
              size="sm"
          />
        </template>

        <DataLayoutItem title="Primary email">
          <Skeleton :dep="data" class="w-32 h-4">
            <span class="text-sm">
              {{data.primaryEmail}}
            </span>
            <VerifiedBadge
                tooltip="Email verified"
                anti-tooltip="Email not verified"
                :verified="data.emailVerified"
            />
          </Skeleton>
        </DataLayoutItem>
      </DataLayout>
    </Box>

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>