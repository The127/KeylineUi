<script setup>

import {ref, onMounted, onBeforeUnmount} from "vue";
import {ChevronDown} from "lucide-vue-next";

const model = defineModel()
const isOpen = ref(false)
const containerEl = ref(null)

const options = [5, 10, 20, 50, 100]

const select = (value) => {
  model.value = value
  isOpen.value = false
}

const handleClickOutside = (e) => {
  if (containerEl.value && !containerEl.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => window.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => window.removeEventListener('click', handleClickOutside))

</script>

<template>
  <div ref="containerEl" class="relative">
    <button
        @click="isOpen = !isOpen"
        class="flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-sm text-slate-700
               hover:bg-slate-50 hover:border-slate-400 cursor-pointer transition-colors"
    >
      {{ model }}
      <ChevronDown class="h-3.5 w-3.5 text-slate-400 transition-transform" :class="{'rotate-180': isOpen}"/>
    </button>
    <ul
        v-if="isOpen"
        class="absolute bottom-full mb-1 left-0 bg-white border border-slate-200 rounded-md shadow-lg z-50 py-1 min-w-[4rem] list-none"
    >
      <li
          v-for="opt in options"
          :key="opt"
          @click="select(opt)"
          class="px-3 py-1.5 text-sm cursor-pointer transition-colors"
          :class="opt === model
            ? 'bg-emerald-50 text-emerald-700 font-medium'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
      >
        {{ opt }}
      </li>
    </ul>
  </div>
</template>
