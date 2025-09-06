<script setup>

import PageHeader from "../../../components/PageHeader.vue";
import PageLayout from "../../../components/PageLayout.vue";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import {useUserManager} from "../../../composables/userManager.js";
import {onMounted, reactive, ref, watch} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ModelMetadata from "../../../components/ModelMetadata.vue";
import {useToast} from "../../../composables/toast.js";
import Box from "../../../components/Box.vue";
import Avatar from "../../../components/Avatar.vue";
import Heading from "../../../components/Heading.vue";
import Button from "../../../components/Button.vue";
import VerifiedBadge from "../../../components/VerifiedBadge.vue";
import DataLayout from "../../../components/dataLayout/DataLayout.vue";
import DataLayoutItem from "../../../components/dataLayout/DataLayoutItem.vue";
import Skeleton from "../../../components/Skeleton.vue";
import Tabs from "../../../components/tabs/Tabs.vue";
import Tab from "../../../components/tabs/Tab.vue";
import Modal from "../../../components/Modal.vue";
import Form from "../../../components/Form.vue";
import Input from "../../../components/Input.vue";
import GeneralTab from "./general/GeneralTab.vue";

const toast = useToast()
const route = useRoute()
const queryClient = useQueryClient()
const userManager = useUserManager(route.params.vsName)

const { isPending, isError, data, error } = useQuery({
  queryKey: ['profile'],
  queryFn: async () => {
    const user = await userManager.getUser()
    const response = await fetch(`http://127.0.0.1:8081/api/virtual-servers/${route.params.vsName}/users/${user.profile.sub}`)
    return response.json()
  }
})

const onEditPassword = () => {
  alert('Password')
}

</script>

<template>
  <PageLayout>
    <template #header>
      <PageHeader
          title="Profile"
          subtitle="Manage your account and personal information."
      />
    </template>

    <Tabs>
      <Tab title="General">
        <GeneralTab/>
      </Tab>

      <Tab title="Security">
        <Box>
          <DataLayout title="Password">
            <template #actions>
              <Button
                  @click="onEditPassword"
                  text="Edit"
                  variant="secondary"
                  size="sm"
              />
            </template>

            <DataLayoutItem title="Temporary">
              false
            </DataLayoutItem>
          </DataLayout>
        </Box>

        <Box>
          <DataLayout title="2 Factor Authentication">
            <template #actions>
              <Button
                  @click="onEditPassword"
                  text="Add"
                  variant="secondary"
                  size="sm"
              />
            </template>
          </DataLayout>
        </Box>

        <Box>
          <DataLayout title="Passkeys">
            <template #actions>
              <Button
                  @click="onEditPassword"
                  text="Add"
                  variant="secondary"
                  size="sm"
              />
            </template>
          </DataLayout>
        </Box>
      </Tab>
    </Tabs>
    <template #footer>
      <ModelMetadata
          :model="data"
      />
    </template>
  </PageLayout>
</template>

<style scoped>

</style>