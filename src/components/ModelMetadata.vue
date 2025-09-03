<script setup>

import {useI18n} from "vue-i18n";

const { d, t } = useI18n({
  messages: {
    en: {
      identifier: 'Identifier',
      created: 'Created',
      updated: 'Updated',
    },
    de: {
      identifier: 'Identifier',
      created: 'Erstellt',
      updated: 'Updated',
    },
  }
})

const props = defineProps({
  model: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <div class="flex flex-row justify-between flex-wrap text-slate-500 text-xs">
    <div class="flex flex-col">
      <span class="font-semibold">{{ t('identifier') }}</span>
      <span>{{ model.id }}</span>
    </div>
    <div class="flex flex-col">
      <span class="font-semibold">{{ t('created') }}</span>
      <span>{{ d(new Date(model.createdAt), 'long',)  }}</span>
    </div>
    <div class="flex flex-col">
      <span class="font-semibold">{{ t('updated') }}</span>
      <span>{{ d(new Date(model.updatedAt), 'long',)  }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>