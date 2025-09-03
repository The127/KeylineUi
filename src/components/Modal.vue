<script setup>

import {onMounted, ref, defineExpose, onBeforeUnmount} from "vue";

const props = defineProps({})

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
          class="rounded-2xl shadow-xl p-5 bg-slate-100"
          @click.stop
      >
        <slot/>
      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>