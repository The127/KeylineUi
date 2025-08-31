<script setup>

import KeylineIcon from "../../components/icons/KeylineIcon.vue";
import Avatar from "../../components/Avatar.vue";
import Input from "../../components/Input.vue";
import {useUserManager} from "../../composables/userManager.js";
import {useRoute} from "vue-router";
import {computedAsync} from "@vueuse/core";

const route = useRoute()
const mgr = useUserManager(route.params.vsName)

const userName = computedAsync(async () => {
  const user = await mgr.getUser()
  return user?.profile?.name ?? user?.profile?.preferred_username ?? ""
}, "")

</script>

<template>
  <div class="flex flex-row gap-3 justify-between bg-slate-100 p-5">
    <RouterLink :to="{name: 'mgmt-dashboard'}" class="flex flex-row gap-2 items-center">
      <KeylineIcon class="w-12 h-12"/>
    </RouterLink>
    <div>
      <Input placeholder="Search anything..."/>
    </div>
    <div>
      <Avatar :username="userName"/>
    </div>
  </div>

  <router-view />
</template>

<style scoped>

</style>