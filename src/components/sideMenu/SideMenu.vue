<script setup>

import SideMenuItem from "./SideMenuItem.vue";
</script>

<template>

  <div class="w-64 bg-slate-200 p-5">
    <ol class="list-none">
      <SideMenuItem :to="{name: 'mgmt-admin'}" text="Administration"/>
      <SideMenuItem :to="{name: 'mgmt-applications'}" text="Applications"/>
      <SideMenuItem :to="{name: 'mgmt-roles'}" text="Roles"/>
      <SideMenuItem :to="{name: 'mgmt-groups'}" text="Groups"/>
      <SideMenuItem :to="{name: 'mgmt-users'}" text="Users"/>
    </ol>
  </div>
</template>

<style scoped>

</style>