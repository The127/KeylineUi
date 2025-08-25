<script setup>

import Heading from "./Heading.vue";
import Button from "./Button.vue";
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useUniqueId} from "../composables/uniqueId.js";

const { t } = useI18n({
  messages: {
    en: { submit: 'submit' },
    de: { submit: 'absenden' },
  },
  inheritLocale: true,
})

const headingId = useUniqueId('heading')

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  submitText: {
    type: String,
  },
})

defineEmits(['submit'])

const submitTextValue = computed(() => props.submitText ?? t('submit'))

</script>

<template>
  <form
      class="flex flex-col flex-wrap gap-3"
      :aria-labelledby="headingId"
      :title="title"
      @submit.prevent="$emit('submit')"
  >
    <slot name="header">
      <Heading :id="headingId" level="h3">{{ title }}</Heading>
    </slot>
    <slot/>
    <slot name="footer">
      <Button type="submit" :text="submitTextValue"/>
    </slot>
  </form>
</template>

<style scoped>

</style>