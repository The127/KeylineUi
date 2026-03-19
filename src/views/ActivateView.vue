<script setup>

import {useI18n} from "vue-i18n";
import {reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import HeadingText from "../components/HeadingText.vue";
import KeylineButton from "../components/KeylineButton.vue";
import KeylineForm from "../components/KeylineForm.vue";
import KeylineInput from "../components/KeylineInput.vue";
import {ConfigApiUrl} from "../config.js";
import {useRoute} from "vue-router";

const {t} = useI18n({
  messages: {
    en: {
      title: 'Activate Device',
      subtitle: 'Enter the code shown on your device',
      userCode: 'User Code',
      submit: 'Activate',
      invalidCode: 'Invalid or expired code. Please check and try again.',
      anErrorHappened: 'An error occurred. Please try again.',
    },
    de: {
      title: 'Gerät aktivieren',
      subtitle: 'Geben Sie den auf Ihrem Gerät angezeigten Code ein',
      userCode: 'Benutzercode',
      submit: 'Aktivieren',
      invalidCode: 'Ungültiger oder abgelaufener Code. Bitte überprüfen Sie Ihre Eingabe.',
      anErrorHappened: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    },
    da: {
      title: 'Aktivér enhed',
      subtitle: 'Indtast koden vist på din enhed',
      userCode: 'Brugerkode',
      submit: 'Aktivér',
      invalidCode: 'Ugyldig eller udløbet kode. Kontroller venligst og prøv igen.',
      anErrorHappened: 'Der opstod en fejl. Prøv venligst igen.',
    },
  },
  inheritLocale: true,
})

const route = useRoute()

const formModel = reactive({
  userCode: route.query.user_code ?? '',
})

const formRules = {
  userCode: {required},
}

const v$ = useVuelidate(formRules, formModel)


const onFormSubmit = async () => {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = `${ConfigApiUrl()}/oidc/${route.params.virtualServer}/activate`
  form.style = 'display: none'

  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'user_code'
  input.value = formModel.userCode
  form.appendChild(input)

  document.body.appendChild(form)
  form.submit()
}

</script>

<template>
  <KeylineForm
      :title="t('title')"
      :submit-text="t('submit')"
      @submit="onFormSubmit"
      :vuelidate="v$"
  >
    <template #header>
      <HeadingText class="text-center">
        {{ t('title') }}
      </HeadingText>
      <p class="text-center text-gray-500">
        {{ t('subtitle') }}
      </p>

    </template>
    <KeylineInput
        v-model="v$.userCode.$model"
        :vuelidate="v$.userCode"
        :label="t('userCode')"
        :placeholder="'XXXX-XXXX'"
        required
        autofocus
    />
    <template #footer>
      <KeylineButton
          variant="special"
          size="lg"
          type="submit"
          :text="t('submit')"
          :disabled="false"
      />
    </template>
  </KeylineForm>
</template>

<style scoped>

</style>
