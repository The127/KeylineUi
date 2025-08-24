<script setup lang="ts">

import Button from "../components/Button.vue";
import Heading from "../components/Heading.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: { title: 'Login', submit: 'Sign In' },
    de: { title: 'Anmelden', submit: 'Einloggen' },
  },
  inheritLocale: true,
})
</script>

<template>
  <div class="flex flex-col flex-wrap">
    <Heading>{{ t('title') }}</Heading>
    <Button text="I am a button"/>
    <Button type="link" text="I am a link"/>
  </div>
</template>

<style scoped>

</style>