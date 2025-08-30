<script setup>

import PageHeader from "../../components/PageHeader.vue";
import {useI18n} from "vue-i18n";
import Button from "../../components/Button.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Dashboard',
    },
    de: {
      title: 'Dashboard',
    },
  },
  inheritLocale: true,
})

</script>

<template>
  <PageHeader
      :title="t('title')"
      subtitle="You can do things on this page"
  >
    <Button text="Do things"/>
  </PageHeader>

  actual page content
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod,
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod,
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod,
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod,
  </p>
</template>

<style scoped>

</style>