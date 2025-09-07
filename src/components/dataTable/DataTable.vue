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
          v-for="app in data.items"
          :key="props.idSelector(app)"
      >
        <td>
          {{ app.name }}
        </td>
        <td>
          {{ app.displayName }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>