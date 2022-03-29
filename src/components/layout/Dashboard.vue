<script setup lang="ts">
import { ref } from "vue"
import Menu from "primevue/menu"
import Button from "primevue/button"
import Sidebar from "../SideBar.vue"
import SideBarItem from "../SideBarItem.vue"
// import useAuthStore from "../../stores/useAuthStore"
import { useToast } from "primevue/usetoast"
// const auth = useAuthStore()
const auth = { username: "Hasinoor" }

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
          console.log("todo")
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
      <template #header="{ sbVariant, sbFloating }: { sbVariant: string; sbFloating: Boolean }">
        <div
          style="height: 60px; overflow: hidden; display: flex; align-items: center; justify-content: center;"
        >
          <transition
            enterActiveClass="animate__animated animate__slideInLeft"
            leaveActiveClass="animate__animated animate__slideOutLeft"
          >
            <h1
              v-if="sbVariant !== 'condensed' || sbFloating === true"
              class="sidebar-header-title"
            >Dashboard</h1>
          </transition>
          <transition
            enterActiveClass="animate__animated animate__slideInRight"
            leaveActiveClass="animate__animated animate__slideOutRight"
          >
            <h1
              v-if="sbVariant === 'condensed' && sbFloating === false"
              class="sidebar-header-title"
            >A</h1>
          </transition>
        </div>
      </template>
      <SideBarItem title="Home" exactActive to="/">
        <template #icon>
          <i class="pi pi-home"></i>
        </template>
      </SideBarItem>
      <SideBarItem title="Contact" exactActive to="/" />
      <SideBarItem title="About" to="/about">
        <template #icon>
          <i class="pi pi-info-circle"></i>
        </template>
        <SideBarItem title="About" to="/about">
          <template #icon>
            <i class="pi pi-info-circle"></i>
          </template>
          <SideBarItem title="Team" to="/about/team"></SideBarItem>
        </SideBarItem>
      </SideBarItem>
      <template #footer="{ sbVariant, sbFloating }: { sbVariant: string; sbFloating: Boolean }">
        <h1 style="color: aliceblue;" class="sidebar-header">Dashboard</h1>
      </template>
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
<style>
.top-nav-bg {
  background-color: #ecf0f1;
  padding: 10px;
}
.sidebar-header-title {
  color: aliceblue;
  position: absolute;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>