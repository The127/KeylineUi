<script setup>

import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useI18n} from "vue-i18n";
import {useMutation} from "@tanstack/vue-query";
import HeadingText from "../HeadingText.vue";
import KeylineButton from "../KeylineButton.vue";
import KeylineForm from "../KeylineForm.vue";
import {ConfigApiUrl} from "../../config.js";
import KeylineInput from "../KeylineInput.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign in to {appName}',
      subTitle: 'Reset temporary password',
      submit: 'Reset password',
      explanationText: 'Your password is marked as temporary. Please enter a new password below.',
      anErrorHappened: 'An error happened',
      newPassword: 'New password',
    },
    de: {
      title: 'In {appName} anmelden',
      subTitle: 'Temporäres Password zurücksetzen',
      submit: 'Passwort zurücksetzen',
      explanationText: 'Ihr Passwort ist als temporär markiert. Bitte geben Sie unten ein neues Passwort ein.',
      anErrorHappened: 'Ein Fehler ist aufgetreten',
      newPassword: 'Neues Passwort',
    },
    da: {
      title: 'Login til {appName}',
      subTitle: 'Nulstil midlertidig adgangskode',
      submit: 'Nulstil adgangskode',
      explanationText: 'Din adgangskode er markeret som midlertidig. Venligst indtast en ny adgangskode nedenfor.',
      anErrorHappened: 'Der skete en fejl',
      newPassword: 'Ny adgangskode',
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
  newPassword: '',
})

const formRules = {
  newPassword: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const loginError = ref(null)

const onFormSubmit = async () => {
  try{
    await resetTemporaryPassword.mutateAsync({
      newPassword: formModel.newPassword,
    })
  }catch(e){
    loginError.value = t('anErrorHappened')
    console.error(e)
  }
}

const resetTemporaryPassword = useMutation({
  mutationFn: async (data) => {
    const response = await fetch(`${ConfigApiUrl()}/logins/${props.token}/reset-temporary-password`, {
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
      <p class="text-center text-red-700" v-if="loginError">
        {{ loginError }}
      </p>
    </template>
    <KeylineInput
        v-model="v$.newPassword.$model"
        :vuelidate="v$.newPassword"
        :label="t('newPassword')"
        required
        type="password"
        autofocus
    />
    <template #footer>
      <KeylineButton
          variant="special"
          size="lg"
          type="submit"
          :text="t('submit')"
      />
    </template>
  </KeylineForm>
</template>

<style scoped>

</style>