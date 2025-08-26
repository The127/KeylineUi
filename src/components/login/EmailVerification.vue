<script setup>

import Form from "../Form.vue";
import Heading from "../Heading.vue";
import {useI18n} from "vue-i18n";
import Button from "../Button.vue";
import Input from "../Input.vue";
import {reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";


const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign in to {appName}',
      subTitle: 'Verify email address',
      explanationText: 'We sent you an email with a verification code. Please enter the code below.',
      verificationCode: 'Verification code',
      submit: 'Verify email',
      resendVerificationEmail: 'Resend verification email',
    },
    de: {
      title: 'In {appName} anmelden',
      subtitle: 'E-Mail Adresse verifizieren',
      explanationText: 'Wir haben Ihnen eine E-Mail mit einem Verifizierungscode gesendet. Bitte geben Sie den Code unten ein.',
      verificationCode: 'Verifizierungscode',
      submit: 'E-Mail verifizieren',
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

const onFormSubmit = async () => {
  alert('todo')
}

const onResendVerificationMail = async () => {
  alert('todo')
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
        {{ t('title', { appName: data.virtualServerDisplayName }) }}
      </Heading>
      <Heading level="h2" class="text-center">
        {{ t('subTitle') }}
      </Heading>
      <p class="text-center">
        {{ t('explanationText') }}
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