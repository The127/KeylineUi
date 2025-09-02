<script setup>

import {provide} from "vue";
import {TOAST_SYMBOL} from "../../composables/toast.js";

const props = defineProps({

})

const show = () => {
  alert('show')
}

provide(TOAST_SYMBOL, {
  show,
})

</script>

<template>
  <slot/>
</template>

<style scoped>

</style>