<script setup>

import KeylineIcon from "../../components/icons/KeylineIcon.vue";
import Avatar from "../../components/Avatar.vue";
import Input from "../../components/Input.vue";
import {adminUiBaseUrl, useUserManager} from "../../composables/userManager.js";
import {useRoute} from "vue-router";
import {computedAsync} from "@vueuse/core";
import Menu from "../../components/menu/Menu.vue";
import MenuItem from "../../components/menu/MenuItem.vue";
import MenuDivider from "../../components/menu/MenuDivider.vue";
import Breadcrumbs from "../../components/Breadcrumbs.vue";

const route = useRoute()
const mgr = useUserManager(route.params.vsName)

const userName = computedAsync(async () => {
  const user = await mgr.getUser()
  return user?.profile?.name ?? user?.profile?.preferred_username ?? ""
}, "")

const onLogout = async () => {
  await mgr.signoutRedirect({
    post_logout_redirect_uri: `${adminUiBaseUrl}/mgmt/${route.params.vsName}/logout`
  })
}

</script>

<template>
  <div class="flex flex-row">
    <div class="w-64 bg-slate-200 p-5">
      <ol class="list-none">
        <li>
          <RouterLink :to="{name: 'mgmt-dashboard'}">
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{name: 'mgmt-applications'}">
            Applications
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{name: 'mgmt-users'}">
            Users
          </RouterLink>
        </li>
      </ol>
    </div>
    <div class="flex-1">
      <div class="flex flex-col h-screen overflow-hidden">
        <div class="flex flex-row gap-3 justify-between bg-emerald-600 p-5 shadow-xl">
          <RouterLink :to="{name: 'mgmt-dashboard'}" class="flex flex-row gap-2 items-center">
            <KeylineIcon class="w-12 h-12 "/>
          </RouterLink>
          <div>
            <Input
                label="Global search"
                hide-label
                placeholder="Search anything..."
            />
          </div>
          <div>
            <Menu>
              <template #activator-content="{ attrs }">
                <Avatar
                    class="hover:bg-slate-400 cursor-pointer"
                    :username="userName"
                    v-bind="attrs"
                />
              </template>

              <MenuItem text="Profile" :to="{name: 'mgmt-profile'}"/>
              <MenuDivider/>
              <MenuItem text="Logout" @click="onLogout"/>
            </Menu>
          </div>
        </div>

        <Breadcrumbs/>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>