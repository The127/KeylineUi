<script setup>

import {computed} from "vue";

const props = defineProps({
  src: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
})

const shorthand = computed(() => {
  return props.username.split(' ').map(v => v[0]).join('')
})

</script>

<template>
  <div class="rounded-full overflow-hidden w-12 h-12 bg-slate-200 flex items-center justify-center text-sm font-semibold">
    <img
        v-if="src"
        :src="src"
        class="w-full h-full object-cover"
    />
    <div
        v-else
        class="flex items-center justify-center ">
      {{ shorthand }}
    </div>
  </div>
</template>

<style scoped>

</style>