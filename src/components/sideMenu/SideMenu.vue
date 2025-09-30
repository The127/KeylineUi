<script setup>

</script>

<template>

  <div class="w-64 bg-slate-200 p-5">
    <ol class="list-none">
      <li>
        <RouterLink :to="{name: 'mgmt-admin'}">
          Administration
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'mgmt-applications'}">
          Applications
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'mgmt-roles'}">
          Roles
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'mgmt-groups'}">
          Groups
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'mgmt-users'}">
          Users
        </RouterLink>
      </li>
    </ol>
  </div>
</template>

<style scoped>

</style>