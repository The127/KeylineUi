<script setup>

import LoadingSkeleton from "./LoadingSkeleton.vue";
import HeadingText from "./HeadingText.vue";

defineProps({
  title: {
    type: String,
    required: true,
    default: undefined,
  },
  subtitle: {
    type: String,
    default: null,
  },
})

</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-row justify-between items-baseline gap-5 flex-wrap">
      <div>
        <LoadingSkeleton :dep="title" class="w-52 h-9">
          <HeadingText>
            {{ title }}
          </HeadingText>
        </LoadingSkeleton>

        <LoadingSkeleton
            :dep="subtitle"
            v-if="subtitle !== null"
            class="w-64 h-5"
        >
            <p class="text-sm text-slate-600">
              {{ subtitle }}
            </p>
        </LoadingSkeleton>
      </div>
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>