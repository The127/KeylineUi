<script setup>

import Form from "../components/Form.vue";
import {useI18n} from "vue-i18n";
import Heading from "../components/Heading.vue";
import Button from "../components/Button.vue";
import {reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Input from "../components/Input.vue";
import {useRoute} from "vue-router";
import {useQuery, useQueryClient} from "@tanstack/vue-query";

const route = useRoute()
const queryClient = useQueryClient()

const { isPending, isError, isFetching, data, error } = useQuery({
  queryKey: ['virtualServersPublicInfo', route.params.virtualServer],
  queryFn: async () => await fetch(`http://127.0.0.1:8081/api/virtual-servers/${route.params.virtualServer}/public-info`).then(
      (response) => response.json(),
  )
})

const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign up to {appName}',
      submit: 'Create account',
      username: 'Username',
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
  email: '',
  password: '',
})

const formRules = {
  username: { required, },
  email: { required, },
  password: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const onFormSubmit = () => {
  alert("registering")
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
    <Input
        type="email"
        v-model="v$.email.$model"
        :vuelidate="v$.email"
        :label="t('email')"
        required
    />
    <template #footer>
      <Button variant="special" type="submit" :text="t('submit')"/>
    </template>
  </Form>
</template>

<style scoped>

</style>