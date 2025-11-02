<script setup>

import KeylineInput from "../KeylineInput.vue";
import HorizontalDivider from "../HorizontalDivider.vue";
import {useI18n} from "vue-i18n";
import {onMounted, reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useMutation} from "@tanstack/vue-query";
import HeadingText from "../HeadingText.vue";
import KeylineButton from "../KeylineButton.vue";
import KeylineForm from "../KeylineForm.vue";
import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../../api/index.js";
import {log} from "qrcode/lib/core/galois-field.js";

const {t} = useI18n({
  messages: {
    en: {
      title: 'Sign in to {appName}',
      subtitle: 'via {tenantName}',
      submit: 'Sign In',
      username: 'Username',
      password: 'Password',
      dontHaveAnAccount: 'Don\'t have an account?',
      register: 'Sign Up',
      or: 'or',
      signInWithPasskey: 'Sign in with passkey',
      forgotPassword: 'forgot password?',
      anErrorHappened: 'An error happened',
      usernameOrPasswordWrong: 'Username or password is wrong',
    },
    de: {
      title: 'In {appName} anmelden',
      subtitle: 'via {tenantName}',
      submit: 'Einloggen',
      username: 'Benutzername',
      password: 'Passwort',
      dontHaveAnAccount: 'Noch kein Konto?',
      register: 'Registrieren',
      or: 'oder',
      signInWithPasskey: 'Mit Passkey anmelden',
      forgotPassword: 'Passwort vergessen?',
      anErrorHappened: 'Ein Fehler ist aufgetreten',
      usernameOrPasswordWrong: 'Benutzername oder Passwort ist falsch',
    },
    da: {
      title: 'Login til {appName}',
      subtitle: 'via {tenantName}',
      submit: 'Log ind',
      username: 'Brugernavn',
      password: 'Adgangskode',
      dontHaveAnAccount: 'Har du ikke en konto?',
      register: 'Registrer',
      or: 'eller',
      signInWithPasskey: 'Log ind med passkey',
      forgotPassword: 'Glemt adgangskode?',
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
  username: {required,},
  password: {required,},
}

const v$ = useVuelidate(formRules, formModel)

const loginError = ref(null)

const onFormSubmit = async () => {
  try {
    await verifyPassword.mutateAsync({
      username: formModel.username,
      password: formModel.password,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      loginError.value = t('usernameOrPasswordWrong')
    } else {
      loginError.value = t('anErrorHappened')
      console.error(e)
    }
  }
}

class AuthError extends Error {
}

const verifyPassword = useMutation({
  mutationFn: async (data) => {
    const response = await fetch(`${ConfigApiUrl()}/logins/${props.token}/verify-password`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      throw new AuthError()
    }
    if (response.status >= 400) {
      throw new Error(response.statusText)
    }

    return response;
  },
  onSuccess: () => {
    emit('next')
  },
})

const passkeyLoginInfoPromise = ref(null);

onMounted(async () => {
  passkeyLoginInfoPromise.value = apiFetch(ConfigApiUrl() + `/logins/${props.token}/passkey/start`, {
    method: 'POST',
  });

  await passkeyLogin(true);
})

const passkeyLogin = async (conditionalMediation) => {
  const loginInfo = await passkeyLoginInfoPromise.value;

  try {
    const credential = await navigator.credentials.get({
      mediation: conditionalMediation ? "conditional" : "required",
      publicKey: {
        challenge: Uint8Array.fromBase64(loginInfo.challenge),
      }
    });

    await apiFetch(`${ConfigApiUrl()}/logins/${props.token}/passkey/finish`, {
      method: "POST",
      body: JSON.stringify({
        id: loginInfo.id,
        webauthnResponse: credential.toJSON(),
      }),
      headers: {"Content-Type": "application/json"},
    });

    emit('next');
  } catch (e) {
    console.error(e);
  }
}

const onSignInWithPasskey = async () => {
  await passkeyLogin(false);
}

</script>

<template>
  <KeylineForm
      :title="t('submit')"
      :submit-text="t('submit')"
      @submit="onFormSubmit"
      :vuelidate="v$"
  >
    <template #header>
      <HeadingText class="text-center">
        {{ t('title', {appName: data.applicationDisplayName}) }}
      </HeadingText>
      <HeadingText level="h2" class="text-center">
        {{ t('subtitle', {tenantName: data.virtualServerDisplayName}) }}
      </HeadingText>
      <p class="text-center text-red-700" v-if="loginError">
        {{ loginError }}
      </p>
    </template>
    <KeylineInput
        v-model="v$.username.$model"
        :vuelidate="v$.username"
        :label="t('username')"
        required
        tabindex="1"
        autofocus
        autocomplete="username webauthn"
    />
    <KeylineInput
        type="password"
        v-model="v$.password.$model"
        :vuelidate="v$.password"
        :label="t('password')"
        required
        tabindex="2"
    >
      <template #action>
        <RouterLink :to="{name: 'forgot-password', params: {virtualServer: data.virtualServerName,},}" tabindex="4">
          {{ t('forgotPassword') }}
        </RouterLink>
      </template>
    </KeylineInput>
    <template #footer>
      <KeylineButton
          variant="special"
          size="lg"
          type="submit"
          :text="t('submit')"
          tabindex="3"
      />
      <HorizontalDivider :text="t('or')"/>
      <div v-if="data.signupEnabled" class="flex flex-row flex-wrap items-center justify-center gap-1">
        <span>{{ t('dontHaveAnAccount') }}</span>
        <RouterLink :to="{name: 'signup', params: {virtualServer: data.virtualServerName}, query: { token: token, },}">
          {{ t('register') }}
        </RouterLink>
      </div>
      <KeylineButton variant="link" :text="t('signInWithPasskey')" @click="onSignInWithPasskey"/>
    </template>
  </KeylineForm>
</template>

<style scoped>

</style>