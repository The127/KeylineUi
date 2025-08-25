<script setup lang="ts">

import {useI18n} from "vue-i18n";
import Form from "../components/Form.vue";
import Input from "../components/Input.vue";
import {useRoute} from "vue-router";
import {useQuery} from "@tanstack/vue-query";
import Heading from "../components/Heading.vue";

const { t } = useI18n({
  messages: {
    en: { title: 'Sign in to {appName}', submit: 'Sign In', email: 'email', password: 'password' },
    de: { title: 'In {appName} anmelden', submit: 'Einloggen', email: 'E-Mail', password: 'Passwort' },
  },
  inheritLocale: true,
})

const route = useRoute()

const fetcher = async (token) =>
    await fetch(`http://127.0.0.1:8081/logins/${token}`).then(
        (response) => response.json(),
    )

const { isPending, isError, isFetching, data, error } = useQuery({
  queryKey: ['login', route.query.token],
  queryFn: () => fetcher(route.query.token),
})

</script>

<template>
  <div class="flex flex-col flex-wrap">
    <p>{{ route.query.token }}</p>
    <div v-if="isPending" class="update">Loading...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      <p>{{ data }}</p>
      <div v-if="isFetching" class="update">Background Updating...</div>
    </div>
    <Form
        v-if="!isPending && !isError && data"
        :title="t('submit')"
        :submit-text="t('submit')"
    >
      <template #header>
        <Heading class="text-center">
          {{ t('title', { appName: data.applicationDisplayName }) }}
        </Heading>
      </template>
      <Input :label="t('email')"/>
      <Input :label="t('password')"/>
    </Form>
  </div>
</template>

<style scoped>

</style>