<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, useRoute } from "vue-router"
const route = useRoute()
</script>
<template>
  <div>
    <RouterLink
      v-for="link in route.matched"
      :to="{ name: link.name, params: route.params }"
      >{{ link.name }}</RouterLink
    >
  </div>
  <RouterView />
</template>
