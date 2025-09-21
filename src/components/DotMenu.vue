<script setup>

import { EllipsisVertical } from "lucide-vue-next"
import PopupMenu from "./menu/PopupMenu.vue";
import KeylineButton from "./KeylineButton.vue";

defineProps({
  size: {
    type: String,
    default: 'sm',
    validator: v => ['sm', 'md', 'lg'].includes(v),
  },
})

</script>

<template>
  <PopupMenu>
    <template #activator-content="{ attrs }">
      <KeylineButton
          text="open menu"
          hide-text
          variant="secondary"
          :size="size"
          v-bind="attrs"
      >
        <template #adornment>
          <EllipsisVertical/>
        </template>
      </KeylineButton>
    </template>

    <slot/>
  </PopupMenu>
</template>

<style scoped>

</style>