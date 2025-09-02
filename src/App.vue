<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import MainLayout from "./layouts/MainLayout.vue";
import LoginLayout from "./layouts/LoginLayout.vue";
import ToastContainer from "./components/toast/ToastContainer.vue";

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout === 'login-layout') return LoginLayout
  else if (route.meta.layout === 'main-layout') return MainLayout
  return MainLayout
})
</script>

<template>
  <ToastContainer>
    <component :is="layout">
      <router-view />
    </component>
  </ToastContainer>
</template>

<style scoped>
</style>
