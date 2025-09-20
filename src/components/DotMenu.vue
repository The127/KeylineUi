<script setup>

import Menu from "./menu/Menu.vue";
import Button from "./Button.vue";
import { EllipsisVertical } from "lucide-vue-next"
import Avatar from "./Avatar.vue";

const props = defineProps({
  size: {
    type: String,
    default: 'sm',
    validator: v => ['sm', 'md', 'lg'].includes(v),
  },
})

</script>

<template>
  <Menu>
    <template #activator-content="{ attrs }">
      <Button
          text="open menu"
          hide-text
          variant="secondary"
          :size="size"
          v-bind="attrs"
      >
        <template #adornment>
          <EllipsisVertical/>
        </template>
      </Button>
    </template>

    <slot/>
  </Menu>
</template>

<style scoped>

</style>