<script setup>

import {ref, provide} from "vue";

const tabs = ref([])

const register = (tab) => {
  for (let t of tabs.value) {
    if (t.title === tab.title) {
      return
    }
  }

  tabs.value.push(tab)

  if (tabs.value.length === 1) {
    select(tab)
    tab.active = true
  }
}

provide('tabManager', {
  register,
})

const select = (tab) => {
  for (let t of tabs.value) {
    if (t.title === tab.title) {
      t.setActive(true)
      t.active = true
    }else{
      t.setActive(false)
      t.active = false
    }
  }
}

</script>

<template>
  <div class="flex flex-row">
    <div v-for="tab in tabs"
         :key="tab.title"
         @click="select(tab)"
        :data-active="tab.active ? true : null"
         class="font-semibold ease-linear px-2 py-1 border-b-2
            [[data-active]]:text-emerald-600 [[data-active]]:border-b-emerald-600
            hover:text-slate-500 cursor-pointer
            border-b-slate-300"
    >
      {{ tab.title }}
    </div>
  </div>
  <slot/>
</template>

<style scoped>

</style>