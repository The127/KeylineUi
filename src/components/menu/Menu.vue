<script setup>

import {computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch} from "vue";
import Button from "../Button.vue";
import {computePosition, flip, offset, shift} from "@floating-ui/dom";

const id = useId()

const props = defineProps({
  placement: {
    type: String,
    default: 'bottom-start',
    validator: v => ['bottom-start', 'bottom-end', 'top-start', 'top-end'].includes(v),
  },
})

const isOpen = ref(false)
const activatorEl = ref(null)
const menuEl = ref(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
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


watch(isOpen, async open => {
  if (open) {
    await nextTick();
    if (activatorEl.value && menuEl.value) {
      computePosition(activatorEl.value, menuEl.value, {
        placement: props.placement,
        middleware: [offset(4), flip(), shift()],
      }).then(({ x, y }) => {
        Object.assign(menuEl.value.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  }
});

function handleClickOutside(event) {
  if (
      menuEl.value &&
      activatorEl.value &&
      !menuEl.value.contains(event.target) &&
      !activatorEl.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
}

onMounted(() => window.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => window.removeEventListener("click", handleClickOutside));

</script>

<template>
  <div>
    <div ref="activatorEl">
      <slot
          name="activator-content"
          :attrs="activatorAttrs"
      >
        <Button
            text="Open"
            v-bind="activatorAttrs"
        />
      </slot>
    </div>
    <ul
        ref="menuEl"
        v-if="isOpen"
        :id="'menu-' + id"
        role="menu"
        class="absolute bg-slate-100 list-none shadow-2xl rounded-md z-50 py-3"
    >
      <slot/>
    </ul>
  </div>
</template>

<style scoped>

</style>