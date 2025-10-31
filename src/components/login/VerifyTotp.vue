<script setup>

import {reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {ConfigApiUrl} from "../../config.js";
import {useMutation} from "@tanstack/vue-query";
import HeadingText from "../HeadingText.vue";
import KeylineForm from "../KeylineForm.vue";
import KeylineButton from "../KeylineButton.vue";
import KeylineInput from "../KeylineInput.vue";

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
const verifyError = ref(null)

const onFormSubmit = async () => {
  try {
    await verifyTotp.mutateAsync({
      totpCode: formModel.code,
    })
  }catch(e) {
    verifyError.value = "An error happened"
    console.error(e)
  }
}

const verifyTotp = useMutation({
  mutationFn: async (data) => {
    const response = await fetch(`${ConfigApiUrl()}/logins/${props.token}/verify-totp`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status >= 400) {
      throw new Error(response.statusText)
    }

    return response;
  },
  onSuccess: () => {
    emit('next')
  },
})

</script>

<template>
  <KeylineForm
      title="TOTP Verification"
      submit-text="Verify TOTP"
      @submit="onFormSubmit"
      :vuelidate="v$"
  >
    <template #header>
      <HeadingText class="text-center">
        Sign in to {{ data.applicationDisplayName }}
      </HeadingText>
      <HeadingText level="h2" class="text-center">
        Verify TOTP
      </HeadingText>
      <p class="text-center">
        Your account has a TOTP configured. Please verify your TOTP.
      </p>
      <p class="text-center text-red-700" v-if="verifyError">
        {{ verifyError }}
      </p>
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
          text="Verify TOTP"
      />
    </template>
  </KeylineForm>
</template>

<style scoped>

</style>