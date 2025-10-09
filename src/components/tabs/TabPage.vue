<script setup>

import {inject, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const route = useRoute()

const active = ref(false)

const tabManager = inject('tabManager')

const setActive = (value) => {
  active.value = value
  if(value) {
    router.replace({ query: { ...route.query, tab: props.name, } })
  }
}

onMounted(() => {
  tabManager.register({
    title: props.title,
    name: props.name,
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