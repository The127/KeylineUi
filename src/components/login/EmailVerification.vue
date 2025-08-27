<script setup>

import Form from "../Form.vue";
import Heading from "../Heading.vue";
import {useI18n} from "vue-i18n";
import Button from "../Button.vue";
import Input from "../Input.vue";
import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useMutation} from "@tanstack/vue-query";


const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign in to {appName}',
      subTitle: 'Verify email address',
      explanationText: 'We sent you an email with a verification code. Please enter the code below.',
      verificationCode: 'Verification code',
      submit: 'Verify email',
      anErrorHappened: 'An error happened',
      resendVerificationEmail: 'Resend verification email',
    },
    de: {
      title: 'In {appName} anmelden',
      subtitle: 'E-Mail Adresse verifizieren',
      explanationText: 'Wir haben Ihnen eine E-Mail mit einem Verifizierungscode gesendet. Bitte geben Sie den Code unten ein.',
      verificationCode: 'Verifizierungscode',
      submit: 'E-Mail verifizieren',
      anErrorHappened: 'Ein Fehler ist aufgetreten',
      resendVerificationEmail: 'E-Mail erneut senden',
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
  verificationToken: '',
})

const formRules = {
  verificationToken: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const apiError = ref(null)

const onFormSubmit = async () => {
  try{
    await verifyEmail.mutateAsync({
      verificationCode: formModel.verificationToken,
    })
  }catch (e) {
    apiError.value = t('anErrorHappened')
    console.error(e)
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
      <p class="text-center text-red-700" v-if="loginError">
        {{ loginError }}
      </p>
    </template>
    <Input
        v-model="v$.verificationToken.$model"
        :vuelidate="v$.verificationToken"
        :label="t('verificationCode')"
        required
    />
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