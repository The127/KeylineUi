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
      subtitle: 'Your entrypoint to Keyline',
    },
    de: {
      title: 'Dashboard',
      subtitle: 'Ihr Einstiegspunkt in Keyline',
    },
    da : {
      title: 'Dashboard',
    },
  },
  inheritLocale: true,
})

const route = useRoute()

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="t('title')"
          :subtitle="t('subtitle')"
      >
      </PageHeader>
    </template>

    <GridLayout>
      <DashboardItem
          title="Applications"
          subtitle="Manage your applications"
          :to="{ name: 'mgmt-applications' }"
      />
      <DashboardItem
          title="Roles"
          subtitle="Manage your tenant roles"
          :to="{ name: 'mgmt-roles' }"
      />
      <DashboardItem
          title="Users"
          subtitle="Manage users"
          :to="{ name: 'mgmt-users' }"
      />
      <DashboardItem
          title="Profile"
          subtitle="Configure your profile"
          :to="{ name: 'mgmt-profile' }"
      />
    </GridLayout>
  </PageLayout>
</template>

<style scoped>

</style>