<script setup>

import {useRoute, useRouter} from "vue-router";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import {useListProjectsQuery} from "../../../api/projects.js";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import {Plus} from "lucide-vue-next";
import KeylineButton from "../../../components/KeylineButton.vue";
import ProjectCreateModal from "./ProjectCreateModal.vue";
import {ref} from "vue";

const route = useRoute()
const router = useRouter()

const onNavigateToProjectDetails = async (project) => {
  await router.push({
    name: 'mgmt-project-details',
    params: {
      vsName: route.params.vsName,
      projectSlug: project.slug,
    }
  })
}

const addProjectModal = ref(null)

const onProjectAdd = () => {
  addProjectModal.value.open()
}

</script>

<template>
  <ProjectCreateModal ref="addProjectModal"/>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Projects"
          subtitle="Manage projects"
      >
        <KeylineButton text="Add" @click="onProjectAdd">
          <template #adornment>
            <Plus/>
          </template>
        </KeylineButton>
      </PageHeader>
    </template>

    <DataTable
        table-key="5196baf9-e74a-45bc-a8ec-533b64753dc4"
        enable-search
        autofocus
        title="Projects"
        :query-fn="(pagination) => useListProjectsQuery(route.params.vsName, pagination)"
        :on-click="onNavigateToProjectDetails"
    >
      <template #columns>
        <DataTableColumn title="Slug" field="slug"/>
        <DataTableColumn title="Name" field="name"/>
      </template>

      <template #row="{ item: project }">
        <DataTableCell>
          {{ project.slug }}
        </DataTableCell>
        <DataTableCell>
          {{ project.name }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>