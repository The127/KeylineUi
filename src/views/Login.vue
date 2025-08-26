<script setup lang="ts">

import {useI18n} from "vue-i18n";
import Form from "../components/Form.vue";
import Input from "../components/Input.vue";
import {useRoute} from "vue-router";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import Heading from "../components/Heading.vue";
import {reactive} from "vue";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Button from "../components/Button.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign in to {appName}',
      submit: 'Sign In',
      username: 'Username',
      password: 'Password',
      dontHaveAnAccount: 'Don\'t have an account?',
      register: 'Sign Up',
    },
    de: {
      title: 'In {appName} anmelden',
      submit: 'Einloggen',
      username: 'Benutzername',
      password: 'Passwort',
      dontHaveAnAccount: 'Noch kein Konto?',
      register: 'Registrieren',
    },
  },
  inheritLocale: true,
})

const route = useRoute()
const queryClient = useQueryClient()

const { isPending, isError, isFetching, data, error } = useQuery({
  queryKey: ['login', route.query.token],
  queryFn: async () => await fetch(`http://127.0.0.1:8081/logins/${route.query.token}`).then(
      (response) => response.json(),
  ),
})

const verifyPassword = useMutation({
  mutationFn: async (data) => await fetch(`http://127.0.0.1:8081/logins/${route.query.token}/verify-password`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(
      (response) => response.json(),
  ),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['login', route.query.token]})
  },
})

const formModel = reactive({
  username: '',
  password: '',
})

const formRules = {
  username: { required, },
  password: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const onFormSubmit = async () => {
  await verifyPassword.mutate({
    username: formModel.username,
    password: formModel.password,
  })
}

</script>

<template>
  <Form
      v-if="!isPending && !isError && data"
      :title="t('submit')"
      :submit-text="t('submit')"
      @submit="onFormSubmit"
      :vuelidate="v$"
  >
    <template #header>
      <Heading class="text-center">
        {{ t('title', { appName: data.virtualServerDisplayName }) }}
      </Heading>
      <Heading level="h2" class="text-center">
        {{ data.applicationDisplayName }}
      </Heading>
    </template>
   <Input
        v-model="v$.username.$model"
        :vuelidate="v$.username"
        :label="t('username')"
        placeholder=""
    />
    <Input
        type="password"
        v-model="v$.password.$model"
        :vuelidate="v$.password"
        :label="t('password')"
        placeholder=""
    />
    <template #footer>
      <Button variant="special" type="submit" :text="t('submit')"/>
      <div v-if="data.signUpUrl" class="flex flex-row flex-wrap items-center justify-center gap-1">
        <span>{{ t('dontHaveAnAccount') }}</span>
        <a :href="data.signUpUrl">{{ t('register') }}</a>
      </div>
    </template>
  </Form>
</template>

<style scoped>

</style>