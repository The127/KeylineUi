<script setup>

import Form from "../components/Form.vue";
import {useI18n} from "vue-i18n";
import Heading from "../components/Heading.vue";
import Button from "../components/Button.vue";
import {markRaw, reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Input from "../components/Input.vue";
import {useRoute} from "vue-router";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

const route = useRoute()
const queryClient = useQueryClient()

const { isPending, isError, isFetching, data, error } = useQuery({
  queryKey: ['virtualServersPublicInfo', route.params.virtualServer],
  queryFn: async () => await fetch(`http://127.0.0.1:8081/api/virtual-servers/${route.params.virtualServer}/public-info`).then(
      (response) => response.json(),
  ).catch((e) => {
    console.log('error', e)
  })
})

const register = useMutation({
  mutationFn: async (data) => await fetch(`http://127.0.0.1:8081/api/virtual-servers/${route.params.virtualServer}/users/register`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
})

const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign up to {appName}',
      submit: 'Create account',
      username: 'Username',
      displayName: 'Display Name',
      email: 'Email',
      password: 'Password',
      dontHaveAnAccount: 'Don\'t have an account?',
      register: 'Sign Up',
      passwordRequirements: 'Password must be at least 8 characters long.'
    },
    de: {
      title: 'In {appName} registrieren',
      submit: 'Konto erstellen',
      username: 'Benutzername',
      displayName: 'Anzeigename',
      email: 'E-Mail Adresse',
      password: 'Passwort',
      dontHaveAnAccount: 'Noch kein Konto?',
      register: 'Registrieren',
      passwordRequirements: 'Passwort muss mindestens 8 Zeichen lang sein.'
    },
  },
  inheritLocale: true,
})

const formModel = reactive({
  username: '',
  displayName: '',
  email: '',
  password: '',
})

const formRules = {
  username: { required, },
  displayName: { required, },
  email: { required, },
  password: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const onFormSubmit = async () => {
  await register.mutateAsync({
    username: formModel.username,
    displayName: formModel.displayName,
    email: formModel.email,
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
        {{ t('title', { appName: data.displayName }) }}
      </Heading>
    </template>
    <Input
        v-model="v$.username.$model"
        :vuelidate="v$.username"
        :label="t('username')"
        required
        maxlength="255"
        autofocus
    />
    <Input
        v-model="v$.displayName.$model"
        :vuelidate="v$.displayName"
        :label="t('displayName')"
        required
        maxlength="255"
    />
    <Input
        type="email"
        v-model="v$.email.$model"
        :vuelidate="v$.email"
        :label="t('email')"
        required
    />
    <Input
        type="password"
        v-model="v$.password.$model"
        :vuelidate="v$.password"
        :label="t('password')"
        required
        :helper-text="t('passwordRequirements')"
        minlength="8"
    />
    <template #footer>
      <Button variant="special" size="lg" type="submit" :text="t('submit')"/>
    </template>
  </Form>
</template>

<style scoped>

</style>