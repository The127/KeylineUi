<script setup>

import {useI18n} from "vue-i18n";
import HeadingText from "../components/HeadingText.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Email verified',
      text: 'Your email was verified. You may now close this tab.',
    },
    de: {
      title: 'E-Mail verifiziert',
      text: 'Ihre E-Mail Addresse wurde erfolgreich verifiziert. Sie können dieses Fenster nun schließen.'
    },
    da: {
      title: 'E-mail verificeret',
      text: 'Din e-mailadresse er blevet verificeret. Du kan lukke dette vindue.'
    },
  },
  inheritLocale: true,
})

</script>

<template>
  <div class="flex flex-col flex-wrap gap-5 items-center">
    <HeadingText>
      {{ t('title') }}
    </HeadingText>
    <p class="text-center">
      {{ t('text') }}
    </p>
  </div>
</template>

<style scoped>

</style>