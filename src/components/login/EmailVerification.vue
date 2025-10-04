<script setup>

import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useMutation} from "@tanstack/vue-query";
import HeadingText from "../HeadingText.vue";
import KeylineButton from "../KeylineButton.vue";
import KeylineForm from "../KeylineForm.vue";
import {ConfigApiUrl} from "../../config.js";


const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign in to {appName}',
      subTitle: 'Verify email address',
      explanationText: 'We sent you an email with a verification code. Please click the link in the email and press the button below.',
      verificationCode: 'Verification code',
      submit: 'email verified',
      anErrorHappened: 'An error happened',
      resendVerificationEmail: 'Resend verification email',
      emailStillNotVerified: 'Email still not verified, try resending the verification email',
    },
    de: {
      title: 'In {appName} anmelden',
      subtitle: 'E-Mail Adresse verifizieren',
      explanationText: 'Wir haben Ihnen eine E-Mail mit einem Verifizierungscode gesendet. Bitte klicken Sie auf den Link in der E-Mail und anschließend auf den Button auf dieser Seite.',
      verificationCode: 'Verifizierungscode',
      submit: 'E-Mail verifiziert',
      anErrorHappened: 'Ein Fehler ist aufgetreten',
      resendVerificationEmail: 'E-Mail erneut senden',
      emailStillNotVerified: 'E-Mail noch nicht verifiziert, versuchen Sie es erneut',
    },
    da: {
      title: 'Login til {appName}',
      subTitle: 'Verificer e-mailadresse',
      explanationText: 'Vi har sendt dig en e-mail med en verifikationskode. Venligst klik på linket i e-mailen og tryk på knappen nedenfor.',
      verificationCode: 'Verifikationskode',
      submit: 'E-mail verificeret',
      anErrorHappened: 'Der skete en fejl',
      resendVerificationEmail: 'Gensend verificeringsmail',
      emailStillNotVerified: 'E-mail er endu ikke verificeret, prøv at gensende verificeringsmailen',
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

const apiError = ref(null)

const onFormSubmit = async () => {
  try{
    await verifyEmail.mutateAsync()
  }catch (e) {
    if (e instanceof AuthError) {
      apiError.value = t('emailStillNotVerified')
    }else{
      apiError.value = t('anErrorHappened')
      console.error(e)
    }
  }
}

const verifyEmail = useMutation({
  mutationFn: async (data) => {
    const response = await fetch(`${ConfigApiUrl()}/logins/${props.token}/verify-email`, {
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

const onResendVerificationMail = async () => {
  try{
    await resendVerificationMail.mutateAsync()
  }catch (e) {
    apiError.value = t('anErrorHappened')
    console.error(e)
  }
}

class AuthError extends Error {}

const resendVerificationMail = useMutation({
  mutationFn: async (data) => {
    const response = await fetch(`${ConfigApiUrl()}/logins/${props.token}/resend-email-verification`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 400) {
      throw new Error(response.statusText)
    }

    return response;
  }
})

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
        {{ t('title', { appName: data.applicationDisplayName }) }}
      </HeadingText>
      <HeadingText level="h2" class="text-center">
        {{ t('subTitle') }}
      </HeadingText>
      <p class="text-center">
        {{ t('explanationText') }}
      </p>
      <p class="text-center text-red-700" v-if="apiError">
        {{ apiError }}
      </p>
    </template>
    <template #footer>
      <KeylineButton
          variant="special"
          size="lg"
          type="submit"
          :text="t('submit')"
          autofocus
      />
      <KeylineButton
          variant="link"
          :text="t('resendVerificationEmail')"
          @click="onResendVerificationMail"
      />
    </template>
  </KeylineForm>
</template>

<style scoped>

</style>