<script setup>

import Button from "../components/Button.vue";

const startLoginFlow = () => {
  window.location.href = 'http://127.0.0.1:8081/oidc/keyline/authorize?client_id=admin-ui&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=oidc+email+profile'
}

</script>

<template>
  <Button text="Start Login Flow" @click="startLoginFlow"/>
</template>

<style scoped>

</style>