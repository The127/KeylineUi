<script setup>

import {provide, ref} from "vue";
import {TOAST_SYMBOL} from "../../composables/toast.js";

const toasts = ref([])

const props = defineProps({

})

const show = (info) => {
  toasts.value.push(info)
}

provide(TOAST_SYMBOL, {
  show,
})

</script>

<template>
  <slot/>
  <template v-for="toast in toasts">
    <span class="text-red-500">
      {{ toast.text }}
    </span>
  </template>
</template>

<style scoped>

</style>