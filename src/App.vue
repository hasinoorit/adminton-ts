<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
</script>
<template>
  <Toast />
  <ConfirmDialog />
  <ConfirmPopup group="popup" />
  <component :is="$route.meta.layout || `div`">
    <router-view />
  </component>
</template>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #2d3d4f;
}
</style>
