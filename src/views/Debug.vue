<script setup>

import Button from "../components/Button.vue";

const startLoginFlow = () => {
  window.location.href = 'http://127.0.0.1:8081/oidc/keyline/authorize?client_id=admin-ui&redirect_uri=http%3A%2F%2Flocalhost%3A5173/debugRedirectTarget&response_type=code&scope=oidc+email+profile'
}

</script>

<template>
  <div class="flex flex-row gap-3">
    <div class="flex flex-col gap-3 w-64 p-3">
      <Button variant="primary" size="lg" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="secondary" size="lg" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="danger" size="lg" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="link" size="lg" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="special" size="lg" text="Start Login Flow" @click="startLoginFlow"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <Button variant="primary" size="sm" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="secondary" size="sm" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="danger" size="sm" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="link" size="sm" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="special" size="sm" text="Start Login Flow" @click="startLoginFlow"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <Button variant="primary" size="md" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="secondary" size="md" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="danger" size="md" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="link" size="md" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="special" size="md" text="Start Login Flow" @click="startLoginFlow"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <Button variant="primary" size="inline" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="secondary" size="inline" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="danger" size="inline" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="link" size="inline" text="Start Login Flow" @click="startLoginFlow"/>
      <Button variant="special" size="inline" text="Start Login Flow" @click="startLoginFlow"/>
    </div>
  </div>
</template>

<style scoped>

</style>