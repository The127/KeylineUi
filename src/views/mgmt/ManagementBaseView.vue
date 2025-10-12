<script setup>

import KeylineIcon from "../../components/icons/KeylineIcon.vue";
import KeylineInput from "../../components/KeylineInput.vue";
import {useUserManager} from "../../composables/userManager.js";
import {useRoute} from "vue-router";
import {computedAsync} from "@vueuse/core";
import MenuItem from "../../components/menu/MenuItem.vue";
import MenuDivider from "../../components/menu/MenuDivider.vue";
import {ConfigApiUrl, ConfigHost} from "../../config.js";
import PopupMenu from "../../components/menu/PopupMenu.vue";
import UserAvatar from "../../components/UserAvatar.vue";
import BreadcrumbNavigation from "../../components/BreadcrumbNavigation.vue";
import SideMenu from "../../components/sideMenu/SideMenu.vue";

const route = useRoute()
const mgr = useUserManager(route.params.vsName)

const userName = computedAsync(async () => {
  const user = await mgr.getUser()
  return user?.profile?.name ?? user?.profile?.preferred_username ?? ""
}, "")

const onLogout = async () => {
  await mgr.signoutRedirect({
    post_logout_redirect_uri: `${ConfigHost()}/mgmt/${route.params.vsName}/logout`
  })
}

</script>

<template>
  <div class="flex flex-row">
    <SideMenu/>

    <div class="flex-1">
      <div class="flex flex-col h-screen overflow-hidden">
        <div class="flex flex-row gap-3 justify-between bg-slate-200 border-b border-b-slate-300 p-5">
          <RouterLink :to="{name: 'mgmt-dashboard'}" class="flex flex-row gap-2 items-center">
            <KeylineIcon class="w-12 h-12 "/>
            <span class="text-xl">Keyline</span>
          </RouterLink>
          <div>
            <KeylineInput
                label="Global search"
                hide-label
                placeholder="Search anything..."
            />
          </div>
          <div>
            <PopupMenu>
              <template #activator-content="{ attrs }">
                <UserAvatar
                    class="hover:bg-slate-400 cursor-pointer"
                    :username="userName"
                    v-bind="attrs"
                />
              </template>

              <MenuItem text="Profile" :to="{name: 'mgmt-profile'}"/>
              <MenuDivider/>
              <MenuItem text="Logout" @click="onLogout"/>
            </PopupMenu>
          </div>
        </div>

        <BreadcrumbNavigation/>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>