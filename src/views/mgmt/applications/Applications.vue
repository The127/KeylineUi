<script setup>

import {useRoute, useRouter} from "vue-router";
import {useCreateApplicationMutation, useListApplicationQuery} from "../../../api/applications.js";
import PageLayout from "../../../components/PageLayout.vue";
import PageHeader from "../../../components/PageHeader.vue";
import DataTable from "../../../components/dataTable/DataTable.vue";
import DataTableCell from "../../../components/dataTable/DataTableCell.vue";
import DataTableColumn from "../../../components/dataTable/DataTableColumn.vue";
import Button from "../../../components/Button.vue";
import Modal from "../../../components/Modal.vue";
import {reactive, ref} from "vue";
import Form from "../../../components/Form.vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Input from "../../../components/Input.vue";
import {useToast} from "../../../composables/toast.js";
import { Plus } from "lucide-vue-next"
import FormGroup from "../../../components/FormGroup.vue";
import RadioButtonGroup from "../../../components/radio/RadioButtonGroup.vue";
import RadioButton from "../../../components/radio/RadioButton.vue";
import ListInput from "../../../components/ListInput.vue";


const route = useRoute()
const router = useRouter()
const toast = useToast()

const addAppModal = ref(null)

const onNavigateToAppDetails = async (app) => {
  await router.push(
      {
        name: 'mgmt-application-details',
        params: {
          vsName: route.params.vsName,
          appId: app.id,
        },
      },
  )
}

const formModel = reactive({
  name: '',
  displayName: '',
  redirectUris: [],
  type: 'public',
})

const formRules = {
  name: { required, },
  displayName: { required, },
  redirectUris: { required, },
  type: { required, },
}

const v$ = useVuelidate(formRules, formModel)

const onAddApplication = () => {
  formModel.name = ''
  formModel.displayName = ''
  formModel.redirectUris = []
  formModel.type = 'public'

  v$.value.$reset()
  addAppModal.value.open()
}

const createApplicationMutation = useCreateApplicationMutation(route.params.vsName)

const createApplication = async () => {
  try{
    await createApplicationMutation.mutateAsync({
      name: formModel.name,
      displayName: formModel.displayName,
      redirectUris: formModel.redirectUris,
    })
    toast.success('Application created')
  } catch (e) {
    console.error(e)
    toast.error('Failed to create application')
  }
  addAppModal.value.close()
}

</script>

<template>
  <Modal ref="addAppModal" title="Add application">
    <Form
        title="Add application"
        @submit="createApplication"
        :vuelidate="v$"
    >
      <Input label="Name"
             v-model="v$.name.$model"
             :vuelidate="v$.name"
             required
             helper-text="The name of the application. Must be unique."
      />
      <Input label="Display Name"
             v-model="v$.displayName.$model"
             :vuelidate="v$.displayName"
             required
             helper-text="The display name of the application. Will be shown to the user."
      />
      <FormGroup title="Application type">
        <RadioButtonGroup
            name="appType"
            v-model="v$.type.$model"
        >
          <RadioButton
              value="public"
              label="Public"
              helper-text="Use for SPAs and mobile Apps."
          />
          <RadioButton
              value="confidential"
              label="Confidential"
              helper-text="Use for server side applications."
          />
        </RadioButtonGroup>
      </FormGroup>
      <FormGroup title="Redirect URIs">
        <ListInput
            label="Redirect URI"
            v-model="v$.redirectUris.$model"
        />
      </FormGroup>
    </Form>
  </Modal>

  <PageLayout>
    <template #header>
      <PageHeader
          title="Applications"
          subtitle="Manage applications"
      >
        <Button text="Add" @click="onAddApplication">
          <template #adornment>
            <Plus/>
          </template>
        </Button>
      </PageHeader>
    </template>

    <DataTable
        enable-search
        autofocus
        title="Applications"
        :queryFn="(pagination) => useListApplicationQuery(route.params.vsName, pagination)"
        :on-click="onNavigateToAppDetails"
    >
      <template #columns>
        <DataTableColumn title="Name" field="name" enable-order initial-order="asc"/>
        <DataTableColumn title="Display Name" field="display_name" enable-order/>
      </template>

      <template #row="{ item: app }">
        <DataTableCell>
          {{ app.name }}
        </DataTableCell>
        <DataTableCell>
          {{ app.displayName }}
        </DataTableCell>
      </template>
    </DataTable>
  </PageLayout>
</template>

<style scoped>

</style>