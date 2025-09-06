<script setup>

import PageHeader from "../../components/PageHeader.vue";
import {useI18n} from "vue-i18n";
import Button from "../../components/Button.vue";
import PageLayout from "../../components/PageLayout.vue";
import {useRoute} from "vue-router";
import {adminUiBaseUrl, useUserManager} from "../../composables/userManager.js";
import Box from "../../components/Box.vue";
import Heading from "../../components/Heading.vue";
import GridLayout from "../../components/GridLayout.vue";
import DataLayoutItem from "../../components/dataLayout/DataLayoutItem.vue";
import DashboardItem from "../../components/DashboardItem.vue";

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

    <GridLayout>
      <DashboardItem
          title="Applications"
          subtitle="Manage your applications"
      />
      <DashboardItem
          title="Profile"
          subtitle="Configure your profile"
      />
    </GridLayout>
  </PageLayout>
</template>

<style scoped>

</style>