<script setup>

import Button from "../components/Button.vue";

const startLoginFlow = () => {
  window.location.href = 'http://127.0.0.1:8081/oidc/keyline/authorize?client_id=admin-ui&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=oidc+email+profile'
}

</script>

<template>
  <div class="flex flex-col gap-3 w-64 p-3">
    <Button variant="primary" text="Start Login Flow" @click="startLoginFlow"/>
    <Button variant="secondary" text="Start Login Flow" @click="startLoginFlow"/>
    <Button variant="danger" text="Start Login Flow" @click="startLoginFlow"/>
    <Button variant="link" text="Start Login Flow" @click="startLoginFlow"/>
    <Button variant="special" text="Start Login Flow" @click="startLoginFlow"/>
  </div>
</template>

<style scoped>

</style>