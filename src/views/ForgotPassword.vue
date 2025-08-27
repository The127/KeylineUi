<script setup>

import {useI18n} from "vue-i18n";
import {reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Form from "../components/Form.vue";
import Heading from "../components/Heading.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import HorizontalDivider from "../components/HorizontalDivider.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Reset password',
      descriptionText: 'Enter your username and email address to start the password reset process.',
      username: 'Username',
      email: 'Email',
      submit: 'Reset password',
    },
    de: {
      title: 'Passwort zurücksetzen',
      descriptionText: 'Geben Sie Ihren Benutzernamen und Ihre E-Mail Addresse ein, um den Prozess zum Zurücksetzen Ihres Passworts zu start.',
      username: 'Benutzername',
      email: 'E-Mail',
      submit: 'Passwort zurücksetzen',
    },
  },
  inheritLocale: true,
})

const formModel = reactive({
  username: '',
  email: '',
})

const formRules = {
  username: { required, },
  email: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const onFormSubmit = async () => {
  alert("TODO")
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
        {{ t('title') }}
      </Heading>
      <p>
        {{ t('descriptionText') }}
      </p>
    </template>
    <Input
        v-model="v$.username.$model"
        :vuelidate="v$.username"
        :label="t('username')"
        required
        autofocus
    />
    <Input
        v-model="v$.email.$model"
        :vuelidate="v$.email"
        :label="t('email')"
        required
    />
    <template #footer>
      <Button
          variant="special"
          size="lg"
          type="submit"
          :text="t('submit')"
          tabindex="3"
      />
    </template>
  </Form>
</template>

<style scoped>

</style>