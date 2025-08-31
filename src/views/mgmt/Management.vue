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
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="flex flex-row gap-3 justify-between bg-gradient-to-r from-slate-50 via-slate-200 to-slate-200 p-5 shadow-xl">
      <RouterLink :to="{name: 'mgmt-dashboard'}" class="flex flex-row gap-2 items-center">
        <KeylineIcon class="w-12 h-12 "/>
      </RouterLink>
      <div>
        <Input placeholder="Search anything..."/>
      </div>
      <div>
        <Avatar :username="userName"/>
      </div>
    </div>

    <div class="flex flex-row flex-1">
      <div class="w-64 bg-slate-200 p-5 h-full">
        side menu
      </div>
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>