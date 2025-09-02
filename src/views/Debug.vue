<script setup>

import Button from "../components/Button.vue";
import {useToast} from "../composables/toast.js";

const toast = useToast()

const demoButton = () => {
  toast.plain("Hello World")
}

</script>

<template>
  <div class="flex flex-row gap-3">
    <div class="flex flex-col gap-3 w-64 p-3">
      <Button variant="primary" size="lg" text="Start Login Flow" @click="demoButton"/>
      <Button variant="secondary" size="lg" text="Start Login Flow" @click="demoButton"/>
      <Button variant="danger" size="lg" text="Start Login Flow" @click="demoButton"/>
      <Button variant="link" size="lg" text="Start Login Flow" @click="demoButton"/>
      <Button variant="special" size="lg" text="Start Login Flow" @click="demoButton"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <Button variant="primary" size="sm" text="Start Login Flow" @click="demoButton"/>
      <Button variant="secondary" size="sm" text="Start Login Flow" @click="demoButton"/>
      <Button variant="danger" size="sm" text="Start Login Flow" @click="demoButton"/>
      <Button variant="link" size="sm" text="Start Login Flow" @click="demoButton"/>
      <Button variant="special" size="sm" text="Start Login Flow" @click="demoButton"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <Button variant="primary" size="md" text="Start Login Flow" @click="demoButton"/>
      <Button variant="secondary" size="md" text="Start Login Flow" @click="demoButton"/>
      <Button variant="danger" size="md" text="Start Login Flow" @click="demoButton"/>
      <Button variant="link" size="md" text="Start Login Flow" @click="demoButton"/>
      <Button variant="special" size="md" text="Start Login Flow" @click="demoButton"/>
    </div>

    <div class="flex flex-col gap-3 w-64 p-3">
      <Button variant="primary" size="inline" text="Start Login Flow" @click="demoButton"/>
      <Button variant="secondary" size="inline" text="Start Login Flow" @click="demoButton"/>
      <Button variant="danger" size="inline" text="Start Login Flow" @click="demoButton"/>
      <Button variant="link" size="inline" text="Start Login Flow" @click="demoButton"/>
      <Button variant="special" size="inline" text="Start Login Flow" @click="demoButton"/>
    </div>
  </div>
</template>

<style scoped>

</style>