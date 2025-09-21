<script setup>

import {ref, provide} from "vue";
import {POPUP_SYMBOL} from "../../composables/popup.js";
import HeadingText from "../HeadingText.vue";
import ModalPopup from "../ModalPopup.vue";
import KeylineButton from "../KeylineButton.vue";

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
  <ModalPopup ref="confirmModalRef">
    <div class="flex flex-col gap-5" v-if="confirmOptions">
      <HeadingText level="h3">
        {{ confirmOptions?.title ?? 'Are you sure?' }}
      </HeadingText>
      <span v-if="confirmOptions.message" class="text-sm">
        {{ confirmOptions.message }}
      </span>
      <div class="flex flex-row gap-2 flex-wrap">
        <KeylineButton
            class="flex-1"
            variant="secondary"
            :text="confirmOptions?.cancelText ?? 'Cancel'"
            @click="() => {
              confirmModalRef.close()
              if (confirmOptions.onCancel)
                confirmOptions.onCancel()
            }"
        />
        <KeylineButton
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
  </ModalPopup>

  <slot/>
</template>

<style scoped>

</style>