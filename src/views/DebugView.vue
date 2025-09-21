<script setup>

import {useToast} from "../composables/toast.js";
import KeylineButton from "../components/KeylineButton.vue";

const toast = useToast()

const demoButton = () => {
  toast.success("Hello World")
}

</script>

<template>
  <div class="flex flex-row gap-3">
    <div class="flex flex-col gap-3 w-64 p-3">
      <KeylineButton variant="primary" size="lg" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="secondary" size="lg" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="danger" size="lg" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="link" size="lg" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="special" size="lg" text="Start Login Flow" @click="demoButton"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <KeylineButton variant="primary" size="md" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="secondary" size="md" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="danger" size="md" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="link" size="md" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="special" size="md" text="Start Login Flow" @click="demoButton"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <KeylineButton variant="primary" size="sm" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="secondary" size="sm" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="danger" size="sm" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="link" size="sm" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="special" size="sm" text="Start Login Flow" @click="demoButton"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <KeylineButton variant="primary" size="inline" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="secondary" size="inline" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="danger" size="inline" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="link" size="inline" text="Start Login Flow" @click="demoButton"/>
      <KeylineButton variant="special" size="inline" text="Start Login Flow" @click="demoButton"/>
    </div>
  </div>
</template>

<style scoped>

</style>