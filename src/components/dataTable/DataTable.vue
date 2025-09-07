<script setup>

import {provide, ref} from "vue";

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

const columns = ref([])

const register = (column) => {
  for (let i = 0; i < columns.value.length; i++) {
    if (columns.value[i].title === column.title) {
      columns.value[i] = column
      return
    }
  }

  columns.value.push(column)
}

provide('tableManager', {
  register,
})

</script>

<template>
  <table class="w-full">
    <thead>
      <tr>
        <th
            v-for="column in columns"
            :key="column.title"
        >
          {{ column.title }}
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

    <tfoot v-if="!isPending">
      TODO: Pagination
    </tfoot>
  </table>
</template>

<style scoped>

</style>