<script setup>

import Form from "../components/Form.vue";
import {useI18n} from "vue-i18n";
import Heading from "../components/Heading.vue";
import Button from "../components/Button.vue";
import {markRaw, reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Input from "../components/Input.vue";
import {useRoute} from "vue-router";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import Spinner from "../components/Spinner.vue";

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
      passwordRequirements: 'Password must be at least 8 characters long.',
      anErrorHappened: 'An error happened',
      registrationCompleted: 'Registration completed',
      youCanNowLogin: 'You can now login with your username and password.',
      backToLogin: 'Back to login',
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
      passwordRequirements: 'Passwort muss mindestens 8 Zeichen lang sein.',
      anErrorHappened: 'Ein Fehler ist aufgetreten',
      registrationCompleted: 'Registrierung abgeschlossen',
      youCanNowLogin: 'Sie können sich nun mit Ihrem Benutzernamen und Passwort anmelden.',
      backToLogin: 'Zurück zur Anmeldung',
    },
    da: {
      title: 'Registrer til {appName}',
      submit: 'Opret konto',
      username: 'Brugernavn',
      email: 'E-mailadresse',
      password: 'Adgangskode',
      dontHaveAnAccount: 'Har du ikke en konto?',
      register: 'Registrer',
      passwordRequirements: 'Din adgangskode skal indeholde mindst 8 tegn.',
      anErrorHappened: 'Der skete en fejl',
      registrationCompleted: 'Registrering gennemført',
      youCanNowLogin: 'Du kan nu logge ind med dit brugernavn og adgangskode.',
      backToLogin: 'Tilbage til login',
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

const registeringDone = ref(false)

const onFormSubmit = async () => {
  try{
    await register.mutateAsync({
      username: formModel.username,
      displayName: formModel.displayName,
      email: formModel.email,
      password: formModel.password,
    })

    registeringDone.value = true
  }catch (e) {
    console.error(e)
  }
}

</script>

<template>
  <div v-if="isPending" class="flex flex-row justify-center items-center">
    <Spinner/>
  </div>
  <div v-else-if="isError">
    {{ t('anErrorHappened') }}
    {{ error }}
  </div>
  <Form
      v-else-if="!registeringDone"
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
  <div v-else class="flex flex-col items-center justify-center">
    <Heading class="text-center">
      {{ t('registrationCompleted') }}
    </Heading>
    <p class="text-center">
      {{ t('youCanNowLogin') }}
    </p>
    <RouterLink
        v-if="route.query.token"
        :to="{name: 'login', query: { token: route.query.token, },}"
    >
      {{ t('backToLogin') }}
    </RouterLink>
  </div>
</template>

<style scoped>

</style>