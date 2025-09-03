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
    <Form title="Profile" v-if="!isPending && !isError && data"
          @submit="onFormSubmit"
          :vuelidate="v$"
    >
      <Input label="DisplayName"
             v-model="v$.displayName.$model"
             :vuelidate="v$.displayName"
             required
      />
    </Form>
    <div class="border-2 border-slate-500 p-2">
      Change email address
    </div>
    <template #footer>
      Footer content
    </template>
  </PageLayout>
</template>

<style scoped>

</style>