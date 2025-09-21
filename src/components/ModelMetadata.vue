<script setup>

import {useI18n} from "vue-i18n";
import LoadingSkeleton from "./LoadingSkeleton.vue";

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
      updated: 'Geändert',
    },
  }
})

defineProps({
  model: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 text-slate-500 text-xs">
    <div class="flex flex-col">
      <span class="font-semibold">{{ t('identifier') }}</span>
      <LoadingSkeleton :dep="model"  class="w-32 h-4">
        <span>{{ model.id }}</span>
      </LoadingSkeleton>
    </div>
    <div class="flex flex-col md:items-end lg:items-center">
      <span class="font-semibold">{{ t('created') }}</span>
      <LoadingSkeleton :dep="model"  class="w-32 h-4">
        <span>{{ d(new Date(model.createdAt), 'long',)  }}</span>
      </LoadingSkeleton>
    </div>
    <div class="flex flex-col lg:items-end">
      <span class="font-semibold">{{ t('updated') }}</span>
      <LoadingSkeleton :dep="model"  class="w-32 h-4">
        <span>{{ d(new Date(model.updatedAt), 'long',)  }}</span>
      </LoadingSkeleton>
    </div>
  </div>
</template>

<style scoped>

</style>