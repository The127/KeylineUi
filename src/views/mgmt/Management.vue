<script setup>

import KeylineIcon from "../../components/icons/KeylineIcon.vue";
import Avatar from "../../components/Avatar.vue";
import Input from "../../components/Input.vue";
import {useUserManager} from "../../composables/userManager.js";
import {useRoute} from "vue-router";
import {computedAsync} from "@vueuse/core";
import Menu from "../../components/menu/Menu.vue";
import MenuItem from "../../components/menu/MenuItem.vue";
import MenuDivider from "../../components/menu/MenuDivider.vue";

const route = useRoute()
const mgr = useUserManager(route.params.vsName)

const userName = computedAsync(async () => {
  const user = await mgr.getUser()
  return user?.profile?.name ?? user?.profile?.preferred_username ?? ""
}, "")

</script>

<template>
  <div class="flex flex-row">
    <div class="w-64 bg-slate-200 p-5">
      side menu
    </div>
    <div class="flex-1">
      <div class="flex flex-col h-screen overflow-hidden">
        <div class="flex flex-row gap-3 justify-between bg-gradient-to-r from-slate-50 via-slate-200 to-slate-200 p-5 shadow-xl">
          <RouterLink :to="{name: 'mgmt-dashboard'}" class="flex flex-row gap-2 items-center">
            <KeylineIcon class="w-12 h-12 "/>
          </RouterLink>
          <div>
            <Input placeholder="Search anything..."/>
          </div>
          <div>
            <Menu>
              <template #activator-content="{ attrs }">
                <Avatar
                    class="hover:bg-slate-400 cursor-pointer"
                    :username="userName"
                    v-bind="attrs"/>
              </template>

              <MenuItem>Profile</MenuItem>
              <MenuDivider/>
              <MenuItem>Logout</MenuItem>
              <MenuItem>Logout</MenuItem>
              <MenuItem>Logout</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </div>
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>