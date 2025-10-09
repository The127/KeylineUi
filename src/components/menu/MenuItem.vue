<script setup>

import {useRouter} from "vue-router";
import {inject, onMounted, ref} from "vue";

const router = useRouter()

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  to: {
    type: Object,
  },
  variant: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'danger'].includes(value),
  },
})

const emit = defineEmits(["click"])

const menuManager = inject("menuManager")
const itemIndex = ref(0)
const el = ref(null)

const onClick = () => {
  if (props.to) {
    router.push(props.to)
  }else{
    emit("click")
  }

  menuManager?.closeMenu()
}

const onKeyDown = (e) => {
  if (e.key === "Enter" || e.key === " ") {
    onClick()
  }
  else if (e.key === "Escape") {
    menuManager?.closeMenu()
  }else if (e.key === "ArrowDown") {
    menuManager?.navigateDown()
  }else if (e.key === "ArrowUp") {
    menuManager?.navigateUp()
  }
}

const onFocus = () => {
  menuManager?.informFocus(itemIndex.value)
}

const focus = () => {
  el.value.focus()
}

onMounted(() => {
  if (menuManager) {
    itemIndex.value = menuManager.registerItem({
      focus,
    })
  }
})

</script>

<template>
  <li
      ref="el"
      role="menuitem"
      tabindex="0"
      class="flex flex-row gap-2 px-5 my-1 cursor-pointer"
      @click="onClick"
      @keydown="onKeyDown"
      @focusin="onFocus"
  >
    <span
        class="transition-colors"
        :class="{'hover:text-slate-500': variant === 'text', 'hover:text-red-600': variant === 'danger'}"
    >
      {{ text }}
    </span>
  </li>
</template>

<style scoped>

</style>