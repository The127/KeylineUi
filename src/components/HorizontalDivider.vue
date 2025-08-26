<script setup>

const props = defineProps({
  text: {
    type: String,
    default: null,
  }
})

</script>

<template>
  <div class="divider">
    <span v-if="text">{{ text }}</span>
  </div>
</template>

<style scoped>
.divider {
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  width: 100%;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
}
</style>