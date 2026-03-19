<script setup>

import {useI18n} from "vue-i18n";
import HeadingText from "../components/HeadingText.vue";

const {t} = useI18n({
  messages: {
    en: {
      title: 'Device activated',
      text: 'Your device has been successfully activated. You may now close this tab.',
    },
    de: {
      title: 'Gerät aktiviert',
      text: 'Ihr Gerät wurde erfolgreich aktiviert. Sie können dieses Fenster nun schließen.',
    },
    da: {
      title: 'Enhed aktiveret',
      text: 'Din enhed er blevet aktiveret. Du kan lukke dette vindue.',
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
