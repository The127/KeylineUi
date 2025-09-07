<script setup>

const props = defineProps({
  query: {
    required: true,
  },
  idSelector: {
    type: Function,
    validator: v => typeof v === 'function',
    default: x => x.id ?? x,
  },
})

const {data, isPending} = props.query()

</script>

<template>
  <table>
    <thead>
      <tr>
        <th>
          Name
        </th>
        <th>
          Display Name
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
          v-if="!isPending"
          v-for="item in data.items"
          :key="props.idSelector(item)"
      >
        <slot :item="item"/>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>