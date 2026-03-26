<script setup>

import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import EditFormModal from "../../../components/EditFormModal.vue";
import {useListUsersQuery, useCreateUserMutation} from "../../../api/user.js";
import {useRoute, useRouter} from "vue-router";
import {useFormModal} from "../../../composables/formModal.js";
import {required, email} from "@vuelidate/validators";
import {User, Bot, Plus} from "lucide-vue-next"

const route = useRoute()
const router = useRouter()

const createUser = useCreateUserMutation(route.params.vsName)

const create = useFormModal({
  fields: {username: '', displayName: '', email: '', password: ''},
  rules: {username: {required}, displayName: {required}, email: {required, email}},
  onSubmit: (form) => createUser.mutateAsync({
    username: form.username,
    displayName: form.displayName,
    email: form.email,
    emailVerified: false,
    password: form.password ? {plain: form.password, temporary: true} : undefined,
  }),
  toastMessages: {success: 'User created', error: 'Failed to create user'},
})
const createModalRef = create.modalRef

const onNavigateToUserDetails = async (user) => {
  await router.push({
    name: 'mgmt-user-details',
    params: {
      vsName: route.params.vsName,
      userId: user.id,
    },
  })
}

</script>

<template>
  <EditFormModal ref="createModalRef" title="Create user" :vuelidate="create.validation" @submit="create.submit">
    <KeylineInput label="Username" v-model="create.validation.username.$model" :vuelidate="create.validation.username" required/>
    <KeylineInput label="Display name" v-model="create.validation.displayName.$model" :vuelidate="create.validation.displayName" required/>
    <KeylineInput label="Email" type="email" v-model="create.validation.email.$model" :vuelidate="create.validation.email" required/>
    <KeylineInput label="Temporary password" type="password" v-model="create.form.password"/>
  </EditFormModal>

  <PageLayout>
    <template #header>
      <PageHeader
          title="Users"
          subtitle="Manage users"
      >
        <KeylineButton text="Add" @click="create.open()">
          <template #adornment>
            <Plus/>
          </template>
        </KeylineButton>
      </PageHeader>
    </template>

    <DataTable
        table-key="b2e0a44b-68c3-42e2-b102-900f2cd3ed9a"
        enable-search
        autofocus
        title="Users"
        :queryFn="(pagination) => useListUsersQuery(route.params.vsName, pagination)"
        :on-click="onNavigateToUserDetails"
    >
      <template #columns>
        <DataTableColumn title="Username" field="username" enable-order initial-order="asc"/>
        <DataTableColumn title="Display Name" field="display_name" enable-order/>
        <DataTableColumn title="Email" field="primary_email" enable-order/>
        <DataTableColumn title="Type" field="service_user" enable-order/>
      </template>

      <template #row="{ item: user }">
        <DataTableCell>
          {{ user.username }}
        </DataTableCell>
        <DataTableCell>
          {{ user.displayName }}
        </DataTableCell>
        <DataTableCell>
          {{ user.primaryEmail }}
        </DataTableCell>
        <DataTableCell>
          <span v-if="user.isServiceUser" title="Service-User">
            <Bot/>
          </span>
          <span v-else title="User">
            <User/>
          </span>
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>
