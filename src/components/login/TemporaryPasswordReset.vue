<script setup>

import {reactive} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Form from "../Form.vue";
import {useI18n} from "vue-i18n";
import Heading from "../Heading.vue";
import Input from "../Input.vue";
import Button from "../Button.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Sign in to {appName}',
      subTitle: 'Reset temporary password',
      submit: 'Reset password',
      explanationText: 'Your password is marked as temporary. Please enter a new password below.',
      newPassword: 'New password',
    },
    de: {
      title: 'In {appName} anmelden',
      subTitle: 'Temporäres Password zurücksetzen',
      submit: 'Passwort zurücksetzen',
      explanationText: 'Ihr Passwort ist als temporär markiert. Bitte geben Sie unten ein neues Passwort ein.',
      newPassword: 'Neues Passwort',
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

const onFormSubmit = async () => {
  alert("todo")
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
        {{ t('title', { appName: data.applicationDisplayName }) }}
      </Heading>
      <Heading level="h2" class="text-center">
        {{ t('subTitle') }}
      </Heading>
      <p class="text-center">
        {{ t('explanationText') }}
      </p>
    </template>
    <Input
        v-model="v$.newPassword.$model"
        :vuelidate="v$.newPassword"
        :label="t('newPassword')"
        required
    />
    <template #footer>
      <Button
          variant="special"
          size="lg"
          type="submit"
          :text="t('submit')"
      />
    </template>
  </Form>
</template>

<style scoped>

</style>