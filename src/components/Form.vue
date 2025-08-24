<script setup>

import Heading from "./Heading.vue";
import Button from "./Button.vue";
import {useI18n} from "vue-i18n";
import {computed} from "vue";

const { t } = useI18n({
  messages: {
    en: { submit: 'submit' },
    de: { submit: 'absenden' },
  },
  inheritLocale: true,
})

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  submitText: {
    type: String,
  }
})

const submitTextValue = computed(() => props.submitText ?? t('submit'))

</script>

<template>
  <form class="flex flex-col flex-wrap gap-3">
    <slot name="header">
      <Heading id="form-title" level="h3">{{ title }}</Heading>
    </slot>
    <slot/>
    <slot name="footer">
      <Button type="submit" :text="submitTextValue"/>
    </slot>
  </form>
</template>

<style scoped>

</style>