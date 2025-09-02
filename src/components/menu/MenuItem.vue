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
      class="flex flex-row gap-2 px-5 my-1 cursor-pointer"
      @click="onClick"
  >
    <span>
      {{ text }}
    </span>
  </li>
</template>

<style scoped>

</style>