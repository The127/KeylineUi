<script setup>

import DataTable from "../../../../../../components/dataTable/DataTable.vue";
import {useListScopesQuery, useDeleteScopeMutation} from "../../../../../../api/scopes.js";
import {useRoute} from "vue-router";
import DataTableColumn from "../../../../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../../../../components/dataTable/DataTableCell.vue";
import KeylineButton from "../../../../../../components/KeylineButton.vue";
import {useDeleteConfirm} from "../../../../../../composables/deleteConfirm.js";

const route = useRoute()
const deleteConfirm = useDeleteConfirm()

const deleteScope = useDeleteScopeMutation(
    route.params.vsName,
    route.params.projectSlug,
    route.params.resourceServerId,
)

const onDeleteScope = (scope) => {
  deleteConfirm.confirm({
    title: 'Delete scope',
    message: `Are you sure you want to delete scope "${scope.name}"?`,
    mutation: deleteScope,
    id: scope.id,
    successMessage: 'Scope deleted',
    errorMessage: 'Failed to delete scope',
  })
}

</script>

<template>
  <DataTable
    table-key="e699f79f-541b-4620-bdb5-561022c3a3cb"
    enable-search
    autofocus
    title="Scopes"
    :query-fn="(pagination) => useListScopesQuery(route.params.vsName, route.params.projectSlug, route.params.resourceServerId, pagination)"
  >
    <template #columns>
      <DataTableColumn title="Scope" field="scope" enable-order initial-order="asc"/>
      <DataTableColumn title="Name" field="name" enable-order/>
      <DataTableColumn title="" field="actions"/>
    </template>

    <template #row="{ item: scope }">
      <DataTableCell>
        {{ scope.scope }}
      </DataTableCell>
      <DataTableCell>
        {{ scope.name }}
      </DataTableCell>
      <DataTableCell>
        <KeylineButton
            @click.stop="onDeleteScope(scope)"
            text="Delete"
            variant="danger"
            size="sm"
        />
      </DataTableCell>
    </template>
  </DataTable>
</template>

<style scoped>

</style>
