<script setup>

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['next'])

</script>

<template>
  EmailVerification
</template>

<style scoped>

</style>