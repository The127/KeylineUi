<script setup>

import {ref, defineExpose} from "vue";

defineProps({
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v),
  },
})

const el = ref(null)

const open = () => {
  if (el.value && !el.value.open) {
    el.value.showModal();
  }
};
const close = () => {
  if (el.value && el.value.open) {
    el.value.close();
  }
};

defineExpose({
  open,
  close,
});

</script>

<template>
  <dialog
      ref="el"
      class="fixed inset-0 max-h-none max-w-none size-auto bg-transparent backdrop-blur-xs"
      @click="close"
  >
    <div class="flex flex-col items-center justify-center h-screen w-screen">
      <div
          class="rounded-2xl shadow-xl p-5 bg-slate-100 w-64 sm:64"
          :class="{'md:w-128': size === 'md', 'lg:w-256 md:w-128': size === 'lg'}"
          @click.stop
      >
        <slot/>
      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>