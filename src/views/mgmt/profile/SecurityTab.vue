<script setup>

import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import BoxContainer from "../../../components/BoxContainer.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import KeylineButton from "../../../components/KeylineButton.vue";
import {apiFetch} from "../../../api/index.js";
import {ConfigApiUrl} from "../../../config.js";
import {useRoute} from "vue-router";
import {useUserManager} from "../../../composables/userManager.js";

const route = useRoute()
const userManager = useUserManager(route.params.vsName)

const onEditPassword = () => {
  alert('Password')
}

const enrollPasskey = async () => {
  const user = await userManager.getUser()
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
          alg: -8, // Ed25519 (COSE calls this EdDSA and marks it as deprecated, but it seems to be what authenticators use for Ed25519)
        },
        {
          type: "public-key",
          alg: -7, // ES256 (ECDSA w/ SHA-256)
        },
        {
          type: "public-key",
          alg: -37, // PS256 (RSASSA-PSS w/ SHA-256)
        },
        {
          type: "public-key",
          alg: -257, // RS256 (RSASSA-PKCS1-v1_5 using SHA-256)
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
  }catch (e) {
    console.error(e)
    // TODO: signal to user that the passkey onboarding failed
    alert("failed to onboard passkey")
  }
}

</script>

<template>
  <BoxContainer>
    <DataLayout title="Password">
      <template #actions>
        <KeylineButton
            @click="onEditPassword"
            text="Edit"
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
            @click="onEditPassword"
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