<script setup>

import PageHeader from "../../components/PageHeader.vue";
import {useI18n} from "vue-i18n";
import Button from "../../components/Button.vue";
import PageLayout from "../../components/PageLayout.vue";
import {useRoute} from "vue-router";
import {adminUiBaseUrl, useUserManager} from "../../composables/userManager.js";

const { t } = useI18n({
  messages: {
    en: {
      title: 'Dashboard',
    },
    de: {
      title: 'Dashboard',
    },
    da : {
      title: 'Dashboard',
    },
  },
  inheritLocale: true,
})

const route = useRoute()
const mgr = useUserManager(route.params.vsName)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="t('title')"
          subtitle="You can do things on this page"
      >
      </PageHeader>
    </template>
    <div>
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
    </div>
    <template #footer>
      Footer content
    </template>
  </PageLayout>
</template>

<style scoped>

</style>