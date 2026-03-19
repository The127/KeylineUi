<script setup>

import {useI18n} from "vue-i18n";
import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import HeadingText from "../components/HeadingText.vue";
import KeylineButton from "../components/KeylineButton.vue";
import KeylineForm from "../components/KeylineForm.vue";
import KeylineInput from "../components/KeylineInput.vue";
import {ConfigApiUrl} from "../config.js";
import {useRoute, useRouter} from "vue-router";

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
const router = useRouter()

const formModel = reactive({
  userCode: route.query.user_code ?? '',
})

const formRules = {
  userCode: {required},
}

const v$ = useVuelidate(formRules, formModel)

const submitError = ref(null)
const isPending = ref(false)

const onFormSubmit = async () => {
  submitError.value = null
  isPending.value = true

  try {
    const body = new URLSearchParams({user_code: formModel.userCode})
    const response = await fetch(
        `${ConfigApiUrl()}/oidc/${route.params.virtualServer}/activate`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: body.toString(),
          redirect: 'follow',
        }
    )

    if (response.status === 404) {
      submitError.value = t('invalidCode')
      return
    }

    if (!response.ok) {
      submitError.value = t('anErrorHappened')
      return
    }

    const finalUrl = new URL(response.url)
    await router.push({path: finalUrl.pathname, query: Object.fromEntries(finalUrl.searchParams)})
  } catch {
    submitError.value = t('anErrorHappened')
  } finally {
    isPending.value = false
  }
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
      <p class="text-center text-red-700" v-if="submitError">
        {{ submitError }}
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
          :disabled="isPending"
      />
    </template>
  </KeylineForm>
</template>

<style scoped>

</style>
