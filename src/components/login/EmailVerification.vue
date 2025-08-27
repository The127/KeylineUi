<script setup>

import Form from "../Form.vue";
import Heading from "../Heading.vue";
import {useI18n} from "vue-i18n";
import Button from "../Button.vue";
import {ref} from "vue";
import {useMutation} from "@tanstack/vue-query";


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
    const response = await fetch(`http://127.0.0.1:8081/logins/${props.token}/verify-email`, {
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
    const response = await fetch(`http://127.0.0.1:8081/logins/${props.token}/resend-email-verification`, {
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
  <Form
      :title="t('submit')"
      :submit-text="t('submit')"
      @submit="onFormSubmit"
      :vuelidate="v$"
  >
    <template #header>
      <Heading class="text-center">
        {{ t('title', { appName: data.applicationDisplayName }) }}
      </Heading>
      <Heading level="h2" class="text-center">
        {{ t('subTitle') }}
      </Heading>
      <p class="text-center">
        {{ t('explanationText') }}
      </p>
      <p class="text-center text-red-700" v-if="apiError">
        {{ apiError }}
      </p>
    </template>
    <template #footer>
      <Button
          variant="special"
          size="lg"
          type="submit"
          :text="t('submit')"
      />
      <Button
          variant="link"
          :text="t('resendVerificationEmail')"
          @click="onResendVerificationMail"
      />
    </template>
  </Form>
</template>

<style scoped>

</style>