<script setup>

import {useRouter} from "vue-router";
import HeadingText from "./HeadingText.vue";
import BoxContainer from "./BoxContainer.vue";

const router = useRouter()

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  to: {
    type: undefined,
    required: true,
  },
})

</script>

<template>
  <BoxContainer
      class="flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-shadow"
      @click="router.push(to)"
  >
    <HeadingText level="h4">
      {{ title }}
    </HeadingText>
    <span v-if="subtitle" class="text-sm text-slate-600">
      {{ subtitle }}
    </span>
  </BoxContainer>
</template>

<style scoped>

</style>