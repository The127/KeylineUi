<script setup>

const props = defineProps({
  model: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <div class="flex flex-row justify-between flex-wrap text-slate-500">
      <span>
        Identifier
        <br/>
        {{ model.id }}
      </span>
    <span>
        Created
        <br/>
        {{ model.createdAt }}
      </span>
    <span>
        Updated
        <br/>
        {{ model.updatedAt }}
      </span>
  </div>
</template>

<style scoped>

</style>