<script setup>

import {useRouter} from "vue-router";
import {inject, onMounted} from "vue";

const router = useRouter()

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  to: {
    type: Object,
  },
})

const emit = defineEmits(["click"])

const menuManager = inject("menuManager")

const onClick = () => {
  if (!!props.to) {
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
}

</script>

<template>
  <li
      role="menuitem"
      tabindex="0"
      class="flex flex-row gap-2 px-5 my-1 cursor-pointer"
      @click="onClick"
      @keydown="onKeyDown"
  >
    <span class="hover:text-slate-500">
      {{ text }}
    </span>
  </li>
</template>

<style scoped>

</style>