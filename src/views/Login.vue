<script setup lang="ts">

import {useRoute} from "vue-router";
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import PasswordVerification from "../components/login/PasswordVerification.vue";
import EmailVerification from "../components/login/EmailVerification.vue";

const route = useRoute()
const queryClient = useQueryClient()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['login', route.query.token],
  queryFn: async () => await fetch(`http://127.0.0.1:8081/logins/${route.query.token}`).then(
      async (response) => {
        var json = await response.json();
        console.log(json)
        if (json.step === 'finish') {
          finalSubmit()
        }
        return json
      }
  ),
})

const finalSubmit = () => {
  const form = document.createElement('form');

  form.method = 'POST';
  //TODO: get from urls
  form.action = `http://127.0.0.1:8081/logins/${route.query.token}/finish-login`;
  form.style = 'display: none';

  const tokenInput = document.createElement('input');
  tokenInput.type = 'hidden';
  tokenInput.name = 'token';
  tokenInput.value = route.query.token;
  form.appendChild(tokenInput);

  document.body.appendChild(form);

  form.submit();
}

const onNext = () => {
  queryClient.invalidateQueries({ queryKey: ['login', route.query.token]})
}

</script>

<template>
  <div v-if="isPending">
    Pending
  </div>
  <div v-else-if="isError">
    Error {{ error }}
  </div>
  <div v-else>
    <PasswordVerification
        v-if="data.step === 'passwordVerification'"
        :token="route.query.token"
        :data="data"
        @next="onNext"
    />
    <EmailVerification
        v-else-if="data.step === 'emailVerification'"
        :token="route.query.token"
        :data="data"
        @next="onNext"
    />
    <div v-else>
      Unknown step: {{ data.step }}
    </div>
  </div>
</template>

<style scoped>

</style>