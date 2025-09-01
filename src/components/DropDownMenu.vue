<script setup>

import {computed, useId} from "vue";
import Button from "./Button.vue";

const id = useId()

const props = defineProps({})

const toggleMenu = () => {
  alert('toggleMenu')
}

const openAndFocus = (index) => {
  alert('openAndFocus')
}

const activatorAttrs = computed(() => ({
  role: 'button',
  tabindex: '0',
  'aria-haspopup': 'true',
  'aria-expanded': 'false',
  'aria-controls': 'menu-' + id,
  onClick: toggleMenu,
  onKeydown: (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openAndFocus(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openAndFocus(-1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  },
}))

</script>

<template>
  <div>
    <slot
        name="activator-content"
        :attrs="activatorAttrs"
    >
      <Button text="Open" v-bind="activatorAttrs"/>
    </slot>
  </div>
</template>

<style scoped>

</style>