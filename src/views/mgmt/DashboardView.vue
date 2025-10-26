<script setup>

import PageHeader from "../../components/PageHeader.vue";
import {useI18n} from "vue-i18n";
import PageLayout from "../../components/PageLayout.vue";
import GridLayout from "../../components/GridLayout.vue";
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
          title="Administration"
          subtitle="Manage this instance of Keyline"
          :to="{ name: 'mgmt-admin' }"
      />
      <DashboardItem
          title="Projects"
          subtitle="Manage your projects"
          :to="{ name: 'mgmt-projects' }"
      />
      <DashboardItem
          title="Groups"
          subtitle="Bundle roles into groups and assign users to groups"
          :to="{ name: 'mgmt-groups' }"
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