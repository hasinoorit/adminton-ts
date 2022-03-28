<script setup lang="ts">
import { ref } from "vue"
import Menu from "primevue/menu"
import Button from "primevue/button"
import Sidebar from "../SideBar.vue"
import SideBarItem from "../SideBarItem.vue"
import useAuthStore from "../../stores/useAuthStore"
import { useToast } from "primevue/usetoast"
const auth = useAuthStore()

const toast = useToast()
const menu = ref()
const variant = ref("expanded")
const floating = ref(false)
const options = ["expanded", "condensed", "hidden"]
const items = ref([
  {
    label: auth.username,
    items: [
      {
        label: "Sign Out",
        icon: "pi pi-sign-out",
        command: () => {
          auth.$app.config.globalProperties.$toast.add({})
        },
      },
      {
        label: "Change Password",
        icon: "pi pi-key",
        command: () => {
          toast.add({
            severity: "warn",
            summary: "Delete",
            detail: "Data Deleted",
            life: 3000,
          })
        },
      },
    ],
  },
])
</script>
<template>
  <div class="flex">
    <Sidebar :variant="variant" v-model:floating="floating">
      <SideBarItem title="Home" exactActive to="/">
        <template #icon>
          <i class="pi pi-home"></i>
        </template>
      </SideBarItem>
      <SideBarItem title="About" to="/about">
        <template #icon>
          <i class="pi pi-info-circle"></i>
        </template>
        <SideBarItem title="Team" to="/about/team">
          <template #icon>
            <i class="pi pi-users"></i>
          </template>
        </SideBarItem>
      </SideBarItem>
    </Sidebar>
    <div class="flex-grow-1 flex flex-column">
      <div class="top-nav-bg">
        <div class="top-nav flex justify-content-end">
          <Button
            @click="menu?.toggle"
            icon="pi pi-user"
            class="p-button-rounded p-button-info p-button-outlined"
          />
          <Menu id="overlay_menu" class="mt-2" ref="menu" :model="items" :popup="true" />
        </div>
      </div>
      <div class="flex-grow-1 p-3">
        <button v-if="variant === 'hidden'" @click="floating = !floating">toggle</button>
        <select v-model="variant">
          <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        </select>
        <slot />
      </div>
    </div>
  </div>
</template>
