<script setup>

import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import VerifiedBadge from "../../../components/VerifiedBadge.vue";
import LoadingSkeleton from "../../../components/LoadingSkeleton.vue";
import BoxContainer from "../../../components/BoxContainer.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import EditFormModal from "../../../components/EditFormModal.vue";
import ModalPopup from "../../../components/ModalPopup.vue";
import KeylineForm from "../../../components/KeylineForm.vue";
import CheckBox from "../../../components/CheckBox.vue";
import {useRoute} from "vue-router";
import {useListPasswordRulesQuery} from "../../../api/passwordRules.js";
import {useCreatePwPolicyRuleMutation, useUpdatePwPolicyRuleMutation, useDeletePwPolicyRuleMutation} from "../../../api/pwPolicies.js";
import {usePatchVirtualServerMutation} from "../../../api/virtualServers.js";
import {useFormModal} from "../../../composables/formModal.js";
import {useDeleteConfirm} from "../../../composables/deleteConfirm.js";
import {useToast} from "../../../composables/toast.js";
import NoContent from "../../../components/NoContent.vue";
import {required} from "@vuelidate/validators";
import {computed, reactive, ref, toRef} from "vue";

const route = useRoute()
const toast = useToast()
const deleteConfirm = useDeleteConfirm()

const props = defineProps({
  data: {
    required: true,
  },
})

const {data: passwordRules} = useListPasswordRulesQuery(route.params.vsName)
const patchVS = usePatchVirtualServerMutation(route.params.vsName)
const createRule = useCreatePwPolicyRuleMutation(route.params.vsName)
const updateRule = useUpdatePwPolicyRuleMutation(route.params.vsName)
const deleteRule = useDeletePwPolicyRuleMutation(route.params.vsName)

const edit = useFormModal({
  fields: {displayName: ''},
  rules: {displayName: {required}},
  onSubmit: (form) => patchVS.mutateAsync({displayName: form.displayName}),
  toastMessages: {success: 'Virtual server updated', error: 'Failed to update virtual server'},
})
const editModalRef = edit.modalRef
edit.syncFrom(toRef(props, 'data'))

const loginRegEdit = useFormModal({
  fields: {registrationEnabled: false, require2fa: false, requireEmailVerification: false},
  rules: {},
  onSubmit: (form) => patchVS.mutateAsync({
    enableRegistration: form.registrationEnabled,
    require2fa: form.require2fa,
    requireEmailVerification: form.requireEmailVerification,
  }),
  toastMessages: {success: 'Login and registration settings updated', error: 'Failed to update settings'},
})
const loginRegEditModalRef = loginRegEdit.modalRef
loginRegEdit.syncFrom(toRef(props, 'data'))

// Password policy rule types with human-readable labels
const ruleTypes = [
  {type: 'min_length', label: 'Minimum length', detailKey: 'minLength', unit: 'characters'},
  {type: 'max_length', label: 'Maximum length', detailKey: 'maxLength', unit: 'characters'},
  {type: 'minimum_lowercase', label: 'Minimum lowercase characters', detailKey: 'minAmount'},
  {type: 'minimum_uppercase', label: 'Minimum uppercase characters', detailKey: 'minAmount'},
  {type: 'minimum_numbers', label: 'Minimum numeric characters', detailKey: 'minAmount'},
  {type: 'minimum_special', label: 'Minimum special characters', detailKey: 'minAmount'},
]

const getRuleType = (type) => ruleTypes.find(r => r.type === type)

const getRuleLabel = (type) => getRuleType(type)?.label ?? type

const getRuleValue = (rule) => {
  const details = typeof rule.details === 'string' ? JSON.parse(rule.details) : rule.details
  const rt = getRuleType(rule.type)
  if (rt) return details?.[rt.detailKey] ?? 0
  return JSON.stringify(details)
}

const buildDetails = (type, value) => {
  const rt = getRuleType(type)
  return {[rt?.detailKey ?? 'value']: parseInt(value, 10)}
}

// Available types not yet configured
const availableRuleTypes = computed(() => {
  const existing = new Set((passwordRules.value?.items || []).map(r => r.type))
  return ruleTypes.filter(r => !existing.has(r.type))
})

// Add rule modal
const addRuleModal = ref(null)
const addRuleForm = reactive({type: '', value: ''})
const addRuleRules = {value: {required}}
const addRuleV$ = ref(null)

const onAddRule = () => {
  if (availableRuleTypes.value.length === 0) return
  addRuleForm.type = availableRuleTypes.value[0].type
  addRuleForm.value = ''
  addRuleModal.value?.open()
}

const onAddRuleSubmit = async () => {
  try {
    await createRule.mutateAsync({
      ruleType: addRuleForm.type,
      details: buildDetails(addRuleForm.type, addRuleForm.value),
    })
    toast.success('Rule added')
    addRuleModal.value?.close()
  } catch (e) {
    toast.error('Failed to add rule')
  }
}

// Edit rule modal
const editRuleModal = ref(null)
const editRuleForm = reactive({type: '', value: ''})

const onEditRule = (rule) => {
  editRuleForm.type = rule.type
  editRuleForm.value = String(getRuleValue(rule))
  editRuleModal.value?.open()
}

const onDeleteRule = (rule) => {
  deleteConfirm.confirm({
    title: 'Delete password rule',
    message: `Are you sure you want to delete the "${getRuleLabel(rule.type)}" rule?`,
    mutation: deleteRule,
    id: rule.type,
    successMessage: 'Rule deleted',
    errorMessage: 'Failed to delete rule',
  })
}

const onEditRuleSubmit = async () => {
  try {
    await updateRule.mutateAsync({
      ruleType: editRuleForm.type,
      details: buildDetails(editRuleForm.type, editRuleForm.value),
    })
    toast.success('Rule updated')
    editRuleModal.value?.close()
  } catch (e) {
    toast.error('Failed to update rule')
  }
}

</script>

<template>
  <EditFormModal ref="editModalRef" title="Edit virtual server" :vuelidate="edit.validation" @submit="edit.submit">
    <KeylineInput label="Display name" v-model="edit.validation.displayName.$model" :vuelidate="edit.validation.displayName" required/>
  </EditFormModal>

  <EditFormModal ref="loginRegEditModalRef" title="Edit login and registration" @submit="loginRegEdit.submit">
    <CheckBox label="Self Registration" v-model="loginRegEdit.form.registrationEnabled"/>
    <CheckBox label="Require 2FA" v-model="loginRegEdit.form.require2fa"/>
    <CheckBox label="Require Email Verification" v-model="loginRegEdit.form.requireEmailVerification"/>
  </EditFormModal>

  <ModalPopup ref="addRuleModal">
    <KeylineForm title="Add password rule" @submit="onAddRuleSubmit">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium">Rule type</label>
        <select v-model="addRuleForm.type" class="border border-gray-300 rounded-md px-3 py-2 text-sm">
          <option v-for="rt in availableRuleTypes" :key="rt.type" :value="rt.type">
            {{ rt.label }}
          </option>
        </select>
      </div>
      <KeylineInput label="Value" type="number" v-model="addRuleForm.value" required/>
    </KeylineForm>
  </ModalPopup>

  <ModalPopup ref="editRuleModal">
    <KeylineForm :title="'Edit ' + getRuleLabel(editRuleForm.type)" @submit="onEditRuleSubmit">
      <KeylineInput :label="getRuleLabel(editRuleForm.type)" type="number" v-model="editRuleForm.value" required/>
    </KeylineForm>
  </ModalPopup>

  <BoxContainer>
    <DataLayout title="Information">
      <template #actions>
        <KeylineButton @click="edit.open(data)" text="Edit" variant="secondary" size="sm"/>
      </template>

      <DataLayoutItem title="Name">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.name }}
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Display Name">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.displayName }}
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="Login and Registration">
      <template #actions>
        <KeylineButton @click="loginRegEdit.open(data)" text="Edit" variant="secondary" size="sm"/>
      </template>
      <DataLayoutItem title="Self Registration">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.registrationEnabled ? 'Enabled' : 'Disabled' }}
          <VerifiedBadge anti-tooltip="disabled" tooltip="enabled" :verified="data.registrationEnabled"/>
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Require 2FA">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.require2fa ? 'Required' : 'Not required' }}
          <VerifiedBadge anti-tooltip="not required" tooltip="required" :verified="data.require2fa"/>
        </LoadingSkeleton>
      </DataLayoutItem>
      <DataLayoutItem title="Require Email Verification">
        <LoadingSkeleton :dep="data" class="w-32 h-4">
          {{ data.requireEmailVerification ? 'Required' : 'Not required' }}
          <VerifiedBadge anti-tooltip="not required" tooltip="required" :verified="data.requireEmailVerification"/>
        </LoadingSkeleton>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="Password policies">
      <template #actions>
        <KeylineButton
            v-if="availableRuleTypes.length > 0"
            @click="onAddRule"
            text="Add rule"
            variant="secondary"
            size="sm"
        />
      </template>

      <DataLayoutItem title="Rules" full-row>
        <NoContent :cond="!passwordRules?.items?.length" message="No password policy rules configured.">
          <div class="w-full rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
            <div class="grid grid-cols-[1fr_8rem_auto] text-sm">
              <div class="px-4 py-2 bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">Rule</div>
              <div class="px-4 py-2 bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">Value</div>
              <div class="px-4 py-2 bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600"></div>

              <template v-for="rule in passwordRules?.items" :key="rule.id">
                <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                  {{ getRuleLabel(rule.type) }}
                </div>
                <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-600">
                  <code class="text-xs font-mono bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md">{{ getRuleValue(rule) }}</code>
                </div>
                <div class="px-4 py-2.5 border-b border-slate-200 dark:border-slate-600 flex items-center gap-2">
                  <KeylineButton @click="onEditRule(rule)" text="Edit" variant="secondary" size="sm"/>
                  <KeylineButton @click="onDeleteRule(rule)" text="Delete" variant="danger" size="sm"/>
                </div>
              </template>
            </div>
          </div>
        </NoContent>
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>
</template>

<style scoped>

</style>
