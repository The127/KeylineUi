<script setup>

import Button from "../Button.vue";
import Input from "../Input.vue";
import Form from "../Form.vue";
import Heading from "../Heading.vue";
import HorizontalDivider from "../HorizontalDivider.vue";
import {useI18n} from "vue-i18n";
import {reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useMutation, useQueryClient} from "@tanstack/vue-query";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign in to {appName}',
      submit: 'Sign In',
      username: 'Username',
      password: 'Password',
      dontHaveAnAccount: 'Don\'t have an account?',
      register: 'Sign Up',
      or: 'or',
      signInWithPasskey: 'Sign in with passkey',
      forgotPassword: 'forgot password?',
    },
    de: {
      title: 'In {appName} anmelden',
      submit: 'Einloggen',
      username: 'Benutzername',
      password: 'Passwort',
      dontHaveAnAccount: 'Noch kein Konto?',
      register: 'Registrieren',
      or: 'oder',
      signInWithPasskey: 'Mit Passkey anmelden',
      forgotPassword: 'Passwort vergessen?',
    },
  },
  inheritLocale: true,
})

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['next'])

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
  await verifyPassword.mutateAsync({
    username: formModel.username,
    password: formModel.password,
  })
}

const verifyPassword = useMutation({
  mutationFn: async (data) => await fetch(`http://127.0.0.1:8081/logins/${props.token}/verify-password`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch(
      (e) => {
        console.log('error', e)
      }
  ),
  onSuccess: () => {
    emit('next')
  },
})

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
        required
        tabindex="1"
    />
    <Input
        type="password"
        v-model="v$.password.$model"
        :vuelidate="v$.password"
        :label="t('password')"
        required
        tabindex="2"
    >
      <template #action>
        <a href="todo" tabindex="4">
          {{ t('forgotPassword') }}
        </a>
      </template>
    </Input>
    <template #footer>
      <Button
          variant="special"
          size="lg"
          type="submit"
          :text="t('submit')"
          tabindex="3"
      />
      <HorizontalDivider :text="t('or')"/>
      <div v-if="data.signUpUrl" class="flex flex-row flex-wrap items-center justify-center gap-1">
        <span>{{ t('dontHaveAnAccount') }}</span>
        <a :href="data.signUpUrl">{{ t('register') }}</a>
      </div>
      <Button variant="link" :text="t('signInWithPasskey')"></Button>
    </template>
  </Form>
</template>

<style scoped>

</style>