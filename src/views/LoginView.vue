<script setup>

import {useRoute} from "vue-router";
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import PasswordVerification from "../components/login/PasswordVerification.vue";
import EmailVerification from "../components/login/EmailVerification.vue";
import TemporaryPasswordReset from "../components/login/TemporaryPasswordReset.vue";
import {useI18n} from "vue-i18n";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import {ConfigApiUrl} from "../config.js";
import OnboardTotp from "../components/login/OnboardTotp.vue";
import VerifyTotp from "../components/login/VerifyTotp.vue";

const {t} = useI18n({
  messages: {
    en: {
      anErrorHappened: 'An error happened',
      loginTimeout: 'The login attempt timed out. Please restart a new login attempt in the source application.',
    },
    de: {
      anErrorHappened: 'Ein Fehler ist aufgetreten',
      loginTimeout: 'Der Login-Versuch hat die maximale Zeitdauer überschritten. Bitte starten Sie den Login erneut, indem Sie zur vorigen Anwendung zurück navigieren.'
    },
    da: {
      anErrorHappened: 'Der skete en fejl',
      loginTimeout: 'Loginforsøget tog for lang tid. Gå tilbage til den oprindelige hjemmeside og prøv igen.',
    },
  },
  inheritLocale: true,
})

const route = useRoute()
const queryClient = useQueryClient()

class AuthError extends Error {
}

const {isPending, isError, data, error} = useQuery({
  queryKey: ['login', route.query.token],
  queryFn: async () => {
    const response = await fetch(`${ConfigApiUrl()}/logins/${route.query.token}`)

    if (response.status === 401) {
      throw new AuthError()
    }

    if (response.status >= 400) {
      throw new Error(response.statusText)
    }

    const json = await response.json();
    if (json.step === 'finish') {
      finishLogin()
    }
    return json
  },
})

const finishLogin = () => {
  const form = document.createElement('form');

  form.method = 'POST';
  form.action = `${ConfigApiUrl()}/logins/${route.query.token}/finish-login`;
  form.style = 'display: none';

  const tokenInput = document.createElement('input');
  tokenInput.type = 'hidden';
  tokenInput.name = 'token';
  tokenInput.value = route.query.token;
  form.appendChild(tokenInput);

  document.body.appendChild(form);

  form.submit();
}

const onNext = () => {
  queryClient.invalidateQueries({queryKey: ['login', route.query.token]})
}

</script>

<template>
  <div v-if="isPending" class="flex flex-row justify-center items-center">
    <LoadingSpinner/>
  </div>
  <div v-else-if="isError">
    <div v-if="error instanceof AuthError">
      {{ t('loginTimeout') }}
    </div>
    <div v-else>
      {{ t('anErrorHappened') }}
      {{ error }}
    </div>
  </div>
  <div v-else>
    <PasswordVerification
        v-if="data.step === 'passwordVerification'"
        :token="route.query.token"
        :data="data"
        @next="onNext"
    />
    <TemporaryPasswordReset
        v-else-if="data.step === 'temporaryPassword'"
        :token="route.query.token"
        :data="data"
        @next="onNext"
    />
    <EmailVerification
        v-else-if="data.step === 'emailVerification'"
        :token="route.query.token"
        :data="data"
        @next="onNext"
    />
    <OnboardTotp
        v-else-if="data.step === 'onboardTotp'"
        :token="route.query.token"
        :data="data"
        @next="onNext"
    />
    <VerifyTotp
        v-else-if="data.step === 'verifyTotp'"
        :data="data"
        :token="route.query.token"
        @next="onNext"
    />
    <div
        v-else-if="data.step === 'finish'"
        class="flex flex-row justify-center items-center"
    >
      <LoadingSpinner/>
    </div>
    <div v-else>
      Unknown step: {{ data.step }}
    </div>
  </div>
</template>

<style scoped>

</style>