<script setup>

import Heading from "./Heading.vue";
import Skeleton from "./Skeleton.vue";

const props = defineProps({
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
        <Skeleton :dep="title" class="w-52 h-9">
          <Heading>
            {{ title }}
          </Heading>
        </Skeleton>

        <Skeleton
            :dep="subtitle"
            v-if="subtitle !== null"
            class="w-64 h-5"
        >
            <p class="text-sm text-slate-600">
              {{ subtitle }}
            </p>
        </Skeleton>
      </div>
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>