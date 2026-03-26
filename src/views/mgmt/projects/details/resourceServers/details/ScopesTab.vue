<script setup>

import DataTable from "../../../../../../components/dataTable/DataTable.vue";
import {useListScopesQuery, useDeleteScopeMutation} from "../../../../../../api/scopes.js";
import {useRoute} from "vue-router";
import DataTableColumn from "../../../../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../../../../components/dataTable/DataTableCell.vue";
import KeylineButton from "../../../../../../components/KeylineButton.vue";
import {useToast} from "../../../../../../composables/toast.js";
import {usePopup} from "../../../../../../composables/popup.js";
import {useQueryClient} from "@tanstack/vue-query";

const route = useRoute()
const toast = useToast()
const popupService = usePopup()
const queryClient = useQueryClient()

const deleteScope = useDeleteScopeMutation(
    route.params.vsName,
    route.params.projectSlug,
    route.params.resourceServerId,
)

const onDeleteScope = (scope) => {
  popupService.confirm({
    title: 'Delete scope',
    message: `Are you sure you want to delete scope "${scope.name}"?`,
    onConfirm: async () => {
      try {
        await deleteScope.mutateAsync(scope.id)
        queryClient.invalidateQueries(['scopes', route.params.vsName, route.params.projectSlug, route.params.resourceServerId])
        toast.success('Scope deleted')
      } catch (e) {
        toast.error('Failed to delete scope')
      }
    }
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
