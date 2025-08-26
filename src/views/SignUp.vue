<script setup>

import Form from "../components/Form.vue";
import {useI18n} from "vue-i18n";
import Heading from "../components/Heading.vue";
import Button from "../components/Button.vue";
import {reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Input from "../components/Input.vue";


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
    },
    de: {
      title: 'In {appName} anmelden',
      submit: 'Konto erstellen',
      username: 'Benutzername',
      email: 'E-Mail Adresse',
      password: 'Passwort',
      dontHaveAnAccount: 'Noch kein Konto?',
      register: 'Registrieren',
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
      :title="t('submit')"
      :submit-text="t('submit')"
      @submit="onFormSubmit"
      :vuelidate="v$"
  >
    <template #header>
      <Heading class="text-center">
        {{ t('title', { appName: "TODO" }) }}
      </Heading>
    </template>
    <Input
        v-model="v$.username.$model"
        :vuelidate="v$.username"
        :label="t('username')"
        required
    />
    <Input
        type="password"
        v-model="v$.password.$model"
        :vuelidate="v$.password"
        :label="t('password')"
        required
    />
    <Input
        type="email"
        v-model="v$.email.$model"
        :vuelidate="v$.email"
        :label="t('email')"
        required
    />
    <template #footer>
      <Button class="mt-5" variant="special" type="submit" :text="t('submit')"/>
    </template>
  </Form>
</template>

<style scoped>

</style>