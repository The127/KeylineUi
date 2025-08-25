<script setup lang="ts">

import {useI18n} from "vue-i18n";
import Form from "../components/Form.vue";
import Input from "../components/Input.vue";
import {useRoute} from "vue-router";

const { t } = useI18n({
  messages: {
    en: { title: 'Login', submit: 'Sign In', email: 'email', password: 'password' },
    de: { title: 'Anmelden', submit: 'Einloggen', email: 'E-Mail', password: 'Passwort' },
  },
  inheritLocale: true,
})

const route = useRoute()

</script>

<template>
  <div class="flex flex-col flex-wrap">
    <p>{{ route.query.token }}</p>
    <Form
        :title="t('title')"
        :submit-text="t('submit')"
    >
      <Input :label="t('email')"/>
      <Input :label="t('password')"/>
    </Form>
  </div>
</template>

<style scoped>

</style>