<script setup>

import {onMounted, reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {ConfigApiUrl} from "../../config.js";
import {useMutation} from "@tanstack/vue-query";
import KeylineForm from "../KeylineForm.vue";
import KeylineButton from "../KeylineButton.vue";
import HeadingText from "../HeadingText.vue";
import KeylineInput from "../KeylineInput.vue";
import {required} from "@vuelidate/validators";
import QRCode from "qrcode";

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['next'])

const formModel = reactive({
  code: '',
})

const formRules = {
  code: {required,},
}

const v$ = useVuelidate(formRules, formModel)
const totpError = ref(null)

const onFormSubmit = async () => {
  try{
    await onboardTotp.mutateAsync({
      totpCode: formModel.code,
    })
  }catch(e){
    totpError.value = "An error happened"
    console.error(e)
  }
}

const onboardTotp = useMutation({
  mutationFn: async (data) => {
    const response = await fetch(`${ConfigApiUrl()}/logins/${props.token}/onboard-totp`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 400) {
      throw new Error(response.statusText)
    }

    return response;
  },
  onSuccess: () => {
    emit('next')
  },
})

const qrCodeDataUrl = ref("");
onMounted(async () => {
  if (props.data?.totpSecret) {
    const issuer = encodeURIComponent(props.data.applicationDisplayName || "App");
    const account = encodeURIComponent(props.data.email || "user@example.com");
    const secret = props.data.totpSecret;

    const otpauthUrl = `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}&digits=6`;

    qrCodeDataUrl.value = await QRCode.toDataURL(otpauthUrl);
  }
});

</script>

<template>
  <KeylineForm
      title="TOTP Onboarding"
      submit-text="Onboard TOTP"
      @submit="onFormSubmit"
      :vuelidate="v$"
  >
    <template #header>
      <HeadingText class="text-center">
        Sign in to {{ data.applicationDisplayName }}
      </HeadingText>
      <HeadingText level="h2" class="text-center">
        Onboard TOTP
      </HeadingText>
      <p class="text-center">
        You need to onboard a TOTP. You can use google authenticator or similar apps.
      </p>
      <p class="text-center text-red-700" v-if="totpError">
        {{ totpError }}
      </p>

      <div v-if="qrCodeDataUrl" class="flex justify-center my-4">
        <img :src="qrCodeDataUrl" alt="TOTP QR Code" class="w-40 h-40" />
      </div>
    </template>

    <KeylineInput
        v-model="v$.code.$model"
        :vuelidate="v$.code"
        label="TOTP Code"
        required
        autofocus
    />

    <template #footer>
      <KeylineButton
          variant="special"
          size="lg"
          type="submit"
          text="Onboard TOTP"
      />
    </template>
  </KeylineForm>
</template>

<style scoped>

</style>