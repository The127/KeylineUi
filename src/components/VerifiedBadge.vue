<script setup>

import {BadgeCheck, BadgeX} from "lucide-vue-next";
import {computed} from "vue";

const props = defineProps({
  verified: {
    type: Boolean,
    required: true,
  },
  tooltip: {
    type: String,
    required: true,
  },
  antiTooltip: {
    type: String,
    required: true,
  },
})

const tooltipValue = computed(() => props.verified ? props.tooltip : props.antiTooltip)

</script>

<template>
  <span :title="tooltipValue">
    <BadgeCheck class="w-4 h-4 text-emerald-500" v-if="verified"/>
    <BadgeX class="w-4 h-4 text-red-700" v-if="!verified"/>
  </span>
</template>

<style scoped>

</style>