<script setup>

import {useI18n} from "vue-i18n";
import {reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Form from "../components/Form.vue";
import Heading from "../components/Heading.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Forgot password',
      descriptionText: 'Enter your email address to start the password reset process.',
      email: 'Email',
      submit: 'Reset password',
    },
    de: {
      title: 'Passwort vergessen',
      descriptionText: 'Geben Sie Ihre E-Mail Addresse ein, um den Prozess zum Zurücksetzen Ihres Passworts zu starten.',
      email: 'E-Mail',
      submit: 'Passwort zurücksetzen',
    },
    da: {
      title: 'Glemt adgangskode',
      descriptionText: 'Indtast din e-mailadresse for at nulstille din adgangskode.',
      email: 'E-mail',
      submit: 'Nulstil adgangskode',
    },
  },
  inheritLocale: true,
})

const formModel = reactive({
  email: '',
})

const formRules = {
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
        type="email"
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