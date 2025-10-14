<script setup>

import {useRoute} from "vue-router";
import DataTable from "../../../components/dataTable/DataTable.vue";
import {useListAuditLogsQuery} from "../../../api/audit.js";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";

const route = useRoute()

</script>

<template>
  <DataTable
      table-key="07000b7c-ec45-4134-b587-19336b128b44"
      title="Audit Logs"
      :query-fn="(pagination) => useListAuditLogsQuery(route.params.vsName, pagination)"
  >
    <template #columns>
      <DataTableColumn title="UserId" field="user_id"/>
      <DataTableColumn title="Request" field="request"/>
      <DataTableColumn title="Response" field="response"/>
      <DataTableColumn title="Allowed" field="allowed"/>
      <DataTableColumn title="Reason" field="allowReason"/>
      <DataTableColumn title="Timestamp" field="audit_created_at" initial-order="desc" enable-order/>
    </template>

    <template #row="{ item: entry }">
      <DataTableCell>
        {{ entry.userId }}
      </DataTableCell>
      <DataTableCell>
        {{ entry.requestData }}
      </DataTableCell>
      <DataTableCell>
        {{ entry.responseData }}
      </DataTableCell>
      <DataTableCell>
        {{ entry.allowed }}
      </DataTableCell>
      <DataTableCell>
        {{ entry.allowReason }}
      </DataTableCell>
      <DataTableCell>
        {{ entry.createdAt }}
      </DataTableCell>
    </template>
  </DataTable>
</template>

<style scoped>

</style>
