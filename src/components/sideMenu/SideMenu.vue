<script setup>

import SideMenuItem from "./SideMenuItem.vue";
</script>

<template>

  <div class="flex flex-col gap-3 w-64 bg-slate-200 p-5 border-r border-r-slate-300">
    <SideMenuItem :to="{name: 'mgmt-admin'}" text="Administration"/>
    <SideMenuItem :to="{name: 'mgmt-projects'}" text="Projects"/>
    <SideMenuItem :to="{name: 'mgmt-groups'}" text="Groups"/>
    <SideMenuItem :to="{name: 'mgmt-users'}" text="Users"/>
  </div>
</template>

<style scoped>

</style>