<script setup>

import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useUniqueId} from "../composables/uniqueId.js";
import HeadingText from "./HeadingText.vue";
import KeylineButton from "./KeylineButton.vue";

const { t } = useI18n({
  messages: {
    en: { submit: 'submit' },
    de: { submit: 'absenden' },
    da: { submit: 'indsend' },
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
  vuelidate: {
    type: Object,
  },
})

const emit = defineEmits(['submit'])

const submitTextValue = computed(() => props.submitText ?? t('submit'))

const onSubmit = async () => {
  if (props.vuelidate) {
    props.vuelidate.$touch()
    if (props.vuelidate.$invalid) {
      return
    }
  }

  emit('submit')
}

</script>

<template>
  <form
      class="flex flex-col flex-wrap gap-5"
      :aria-labelledby="headingId"
      @submit.prevent="onSubmit"
  >
    <slot name="header">
      <HeadingText :id="headingId" level="h3">{{ title }}</HeadingText>
    </slot>
    <slot/>
    <slot name="footer">
      <KeylineButton type="submit" :text="submitTextValue"/>
    </slot>
  </form>
</template>

<style scoped>

</style>