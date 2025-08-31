<script setup>

import PageHeader from "../../components/PageHeader.vue";
import PageLayout from "../../components/PageLayout.vue";
import {useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import {useUserManager} from "../../composables/userManager.js";
import Form from "../../components/Form.vue";
import Input from "../../components/Input.vue";
import {reactive, watch} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

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

const onFormSubmit = async () => {
  alert("form submit")
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader title="Profile"/>
    </template>
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
    <template #footer>
      Footer content
    </template>
  </PageLayout>
</template>

<style scoped>

</style>