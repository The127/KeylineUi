<script setup>

import PageLayout from "../../../../components/PageLayout.vue";
import PageHeader from "../../../../components/PageHeader.vue";
import {useRoute, useRouter} from "vue-router";
import {useGetProjectQuery} from "../../../../api/projects.js";
import ModelMetadata from "../../../../components/ModelMetadata.vue";
import BoxContainer from "../../../../components/BoxContainer.vue";
import DataLayout from "../../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../../components/dataLayout/DataLayoutItem.vue";
import LoadingSkeleton from "../../../../components/LoadingSkeleton.vue";
import TabLayout from "../../../../components/tabs/TabLayout.vue";
import TabPage from "../../../../components/tabs/TabPage.vue";
import DataTable from "../../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../../components/dataTable/DataTableColumn.vue";
import DataTableCell from "../../../../components/dataTable/DataTableCell.vue";
import {useListResourceServersQuery} from "../../../../api/resourceServers.js";
import {useListRolesQuery} from "../../../../api/roles.js";
import {useListApplicationQuery} from "../../../../api/applications.js";
import GridLayout from "../../../../components/GridLayout.vue";
import DashboardItem from "../../../../components/DashboardItem.vue";
import HeadingText from "../../../../components/HeadingText.vue";

const route = useRoute()

const {data} = useGetProjectQuery(
    route.params.vsName,
    route.params.projectSlug,
)

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          :title="data?.name"
          subtitle="Manage project resources, configuration and settings"
      />
    </template>

    <BoxContainer>
      <DataLayout title="Information">
        <DataLayoutItem title="Name">
          <LoadingSkeleton :dep="data" class="w-32 h4">
            {{ data.name }}
          </LoadingSkeleton>
        </DataLayoutItem>
        <DataLayoutItem title="Slug">
          <LoadingSkeleton :dep="data" class="w-32 h4">
            {{ data.slug }}
          </LoadingSkeleton>
        </DataLayoutItem>
        <DataLayoutItem title="Description" full-row>
          <LoadingSkeleton :dep="data" class="w-full h4">
            {{ data.description }}
          </LoadingSkeleton>
        </DataLayoutItem>
      </DataLayout>
    </BoxContainer>

    <HeadingText level="h2">
      Resources in this project
    </HeadingText>

    <GridLayout>
      <DashboardItem
          title="Applications"
          subtitle="Manage this projects applications"
          :to="{name: 'mgmt-applications-overview'}"
      />
      <DashboardItem
          title="ResourceServers"
          subtitle="Manage this projects resource servers"
          :to="{name: 'mgmt-resource-servers-overview'}"
      />
      <DashboardItem
          title="Roles"
          subtitle="Manage this projects roles"
          :to="{name: 'mgmt-roles-overview'}"
      />
    </GridLayout>

    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>