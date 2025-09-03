<script setup>

import {inject, onMounted, ref} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const active = ref(false)

const tabManager = inject('tabManager')

const setActive = (value) => {
  active.value = value
}

onMounted(() => {
  tabManager.register({
    title: props.title,
    setActive,
  })
})

</script>

<template>
  <template v-if="active">
    <slot/>
  </template>
</template>

<style scoped>

</style>