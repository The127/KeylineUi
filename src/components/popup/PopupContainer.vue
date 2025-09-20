<script setup>

import Modal from "../Modal.vue";
import {ref, provide} from "vue";
import {POPUP_SYMBOL} from "../../composables/popup.js";
import Heading from "../Heading.vue";
import Button from "../Button.vue";

const confirmModalRef = ref(null)
const confirmOptions = ref(null)

provide(POPUP_SYMBOL, {
  confirm: (opts) => {
    confirmOptions.value = opts
    confirmModalRef.value.open()
  }
})

</script>

<template>
  <Modal ref="confirmModalRef">
    <div class="flex flex-col gap-5" v-if="confirmOptions">
      <Heading level="h3">
        {{ confirmOptions?.title ?? 'Are you sure?' }}
      </Heading>
      <span v-if="confirmOptions.message" class="text-sm">
        {{ confirmOptions.message }}
      </span>
      <div class="flex flex-row gap-2 flex-wrap">
        <Button
            class="flex-1"
            variant="secondary"
            :text="confirmOptions?.cancelText ?? 'Cancel'"
            @click="() => {
              confirmModalRef.close()
              if (confirmOptions.onCancel)
                confirmOptions.onCancel()
            }"
        />
        <Button
            class="flex-1"
            variant="danger"
            :text="confirmOptions?.confirmText ?? 'Confirm'"
            @click="() => {
              confirmModalRef.close()
              if (confirmOptions.onConfirm)
                confirmOptions.onConfirm()
            }"
        />
      </div>
    </div>
  </Modal>

  <slot/>
</template>

<style scoped>

</style>