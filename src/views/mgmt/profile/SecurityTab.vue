<script setup>

import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import BoxContainer from "../../../components/BoxContainer.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import ModalPopup from "../../../components/ModalPopup.vue";
import KeylineForm from "../../../components/KeylineForm.vue";
import KeylineInput from "../../../components/KeylineInput.vue";
import {apiFetch} from "../../../api/index.js";
import {ConfigApiUrl} from "../../../config.js";
import {useRoute} from "vue-router";
import {useUserManager} from "../../../composables/userManager.js";
import {useChangeOwnPasswordMutation} from "../../../api/user.js";
import {useToast} from "../../../composables/toast.js";
import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const route = useRoute()
const toast = useToast()
const userManager = useUserManager(route.params.vsName)
const user = await userManager.getUser()

const passwordModal = ref(null)

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const sameAsNew = (value) => value === passwordForm.newPassword

const passwordRules = {
  currentPassword: {required},
  newPassword: {required},
  confirmPassword: {required, sameAsNew},
}

const passwordV$ = useVuelidate(passwordRules, passwordForm)

const changePassword = useChangeOwnPasswordMutation(route.params.vsName, user.profile.sub)

const onEditPassword = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  passwordV$.value.$reset()
  passwordModal.value.open()
}

const onPasswordSubmit = async () => {
  try {
    await changePassword.mutateAsync({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    })
    toast.success('Password changed')
    passwordModal.value.close()
  } catch {
    toast.error('Failed to change password. Please check your current password.')
  }
}

const enrollPasskey = async () => {
  const enrollInfo = await apiFetch(ConfigApiUrl() + `/api/virtual-servers/${route.params.vsName}/users/${user.profile.sub}/passkeys/register/start`, {
    method: 'POST',
    vsName: route.params.vsName,
  });

  const publicKeyCredential =  await navigator.credentials.create({
    publicKey: {
      challenge: Uint8Array.fromBase64(enrollInfo.challenge),
      rp: {
        name: "Keyline"
      },
      user: {
        id: Uint8Array.from(enrollInfo.userId, c => c.charCodeAt(0)),
        name: enrollInfo.username,
        displayName: enrollInfo.displayName,
      },
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -8, // Ed25519
        },
        {
          type: "public-key",
          alg: -7, // ES256
        },
        {
          type: "public-key",
          alg: -37, // PS256
        },
        {
          type: "public-key",
          alg: -257, // RS256
        },
      ],
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'required',
      },
    }
  });

  try{
    await apiFetch(`${ConfigApiUrl()}/api/virtual-servers/${route.params.vsName}/users/${user.profile.sub}/passkeys/register/finish`, {
      method: 'POST',
      vsName: route.params.vsName,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: enrollInfo.id,
        webauthnResponse: publicKeyCredential.toJSON(),
      })
    });
    toast.success('Passkey enrolled')
  }catch (e) {
    console.error(e)
    toast.error('Failed to enroll passkey')
  }
}

</script>

<template>
  <ModalPopup ref="passwordModal">
    <KeylineForm title="Change password"
                 @submit="onPasswordSubmit"
                 :vuelidate="passwordV$"
    >
      <KeylineInput label="Current password"
                    type="password"
                    v-model="passwordV$.currentPassword.$model"
                    :vuelidate="passwordV$.currentPassword"
                    required
      />
      <KeylineInput label="New password"
                    type="password"
                    v-model="passwordV$.newPassword.$model"
                    :vuelidate="passwordV$.newPassword"
                    required
      />
      <KeylineInput label="Confirm new password"
                    type="password"
                    v-model="passwordV$.confirmPassword.$model"
                    :vuelidate="passwordV$.confirmPassword"
                    required
      />
    </KeylineForm>
  </ModalPopup>

  <BoxContainer>
    <DataLayout title="Password">
      <template #actions>
        <KeylineButton
            @click="onEditPassword"
            text="Change"
            variant="secondary"
            size="sm"
        />
      </template>

      <DataLayoutItem title="Temporary">
        false
      </DataLayoutItem>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="2 Factor Authentication">
      <template #actions>
        <KeylineButton
            text="Add"
            variant="secondary"
            size="sm"
        />
      </template>
    </DataLayout>
  </BoxContainer>

  <BoxContainer>
    <DataLayout title="Passkeys">
      <template #actions>
        <KeylineButton
            @click="enrollPasskey"
            text="Add"
            variant="secondary"
            size="sm"
        />
      </template>
    </DataLayout>
  </BoxContainer>
</template>
