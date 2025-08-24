<script setup>

import Heading from "./Heading.vue";
import Button from "./Button.vue";
import {useI18n} from "vue-i18n";

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
})

</script>

<template>
  <form>
    <Heading id="form-title" level="h3">{{ title }}</Heading>
    <slot/>
    <Button type="submit" :text="t('submit')"/>
  </form>
</template>

<style scoped>

</style>