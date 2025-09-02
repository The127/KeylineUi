<script setup>

import {useRouter} from "vue-router";

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

const onClick = () => {
  if (!!props.to) {
    router.push(props.to)
  }else{
    emit("click")
  }
}

</script>

<template>
  <li
      role="menuitem"
      tabindex="0"
      class="flex flex-row gap-2 px-5 my-1 cursor-pointer"
      @click="onClick"
  >
    <span class="hover:text-slate-500">
      {{ text }}
    </span>
  </li>
</template>

<style scoped>

</style>