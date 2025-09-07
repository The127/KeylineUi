<script setup>

import {useRoute} from "vue-router";
import {useProfileQuery} from "../../../api/user.js";
import {useListApplicationQuery} from "../../../api/applications.js";

const route = useRoute()

const { isPending, isError, data, error } = useListApplicationQuery(
    route.params.vsName,
)

</script>

<template>
  Applications View
  <br/>
  {{data}}
</template>

<style scoped>

</style>