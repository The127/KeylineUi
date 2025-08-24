<script setup lang="ts">

import Button from "../components/Button.vue";
import Heading from "../components/Heading.vue";
import {useI18n} from "vue-i18n";
import Form from "../components/Form.vue";
import FormGroup from "../components/FormGroup.vue";
import FormItem from "../components/FormItem.vue";
import Input from "../components/Input.vue";

const { t } = useI18n({
  messages: {
    en: { title: 'Login', submit: 'Sign In', email: 'email', password: 'password' },
    de: { title: 'Anmelden', submit: 'Einloggen', email: 'E-Mail', password: 'Passwort' },
  },
  inheritLocale: true,
})
</script>

<template>
  <div class="flex flex-col flex-wrap">
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