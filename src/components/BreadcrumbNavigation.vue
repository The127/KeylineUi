<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { ChevronRight } from "lucide-vue-next"

const route = useRoute();
const router = useRouter();

const breadcrumbs = ref([]);

watchEffect(async () => {
  const results = [];

  for (const item of route.matched) {
    if (item.meta.breadcrumbFn) {
      const label = item.meta.breadcrumbFn.constructor.name === "AsyncFunction"
          ? await item.meta.breadcrumbFn(route)
          : item.meta.breadcrumbFn(route);

      // resolve path with current params
      let to = null;
      if (item.name && !item.meta.breadcrumbNoLink) {
        to = router.resolve({
          name: item.name,
          params: route.params,
          query: route.query, // optional, include current query
        }).href;
      }

      results.push({ label, to });
    }
  }

  breadcrumbs.value = results;
});
</script>

<template>
  <nav aria-label="Breadcrumb" class="px-10 pt-5">
    <ol class="flex items-center">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <span v-if="index === breadcrumbs.length - 1 || !crumb.to">
          {{ crumb.label }}
        </span>
        <RouterLink v-else :to="crumb.to">
          {{ crumb.label }}
        </RouterLink>
        <ChevronRight v-if="index < breadcrumbs.length - 1" class="text-gray-500 w-4 h-4"/>
      </li>
    </ol>
  </nav>
</template>
