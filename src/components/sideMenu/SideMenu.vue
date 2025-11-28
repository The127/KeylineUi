<script setup>

import SideMenuItem from "./SideMenuItem.vue";
import KeylineIcon from "../icons/KeylineIcon.vue";
</script>

<template>

  <div class="flex flex-col w-80 bg-slate-100 border-r border-r-slate-200">
    <div class="h-20 mx-5 border-b border-b-slate-200 flex flex-row items-center">
      <RouterLink :to="{name: 'mgmt-dashboard'}" class="flex flex-row gap-2 items-center">
        <KeylineIcon class="w-12 h-12 "/>
        <span class="text-xl">Keyline</span>
      </RouterLink>
    </div>

    <div class="flex flex-col p-5 gap-3">
      <SideMenuItem :to="{name: 'mgmt-admin'}" text="Administration"/>
      <SideMenuItem :to="{name: 'mgmt-projects'}" text="Projects"/>
      <SideMenuItem :to="{name: 'mgmt-groups'}" text="Groups"/>
      <SideMenuItem :to="{name: 'mgmt-users'}" text="Users"/>
    </div>
  </div>
</template>

<style scoped>

</style>