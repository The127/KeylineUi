<script setup>

import {useI18n} from "vue-i18n";
import HeadingText from "../components/HeadingText.vue";

const {t} = useI18n({
  messages: {
    en: {
      title: 'Logged out',
      text: 'You have been logged out. You may now close this tab.',
    },
    de: {
      title: 'Abgemeldet',
      text: 'Sie wurden abgemeldet. Sie können dieses Fenster nun schließen.',
    },
    da: {
      title: 'Logget ud',
      text: 'Du er blevet logget ud. Du kan lukke dette vindue.',
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
