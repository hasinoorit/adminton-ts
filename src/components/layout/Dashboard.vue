<script setup lang="ts">
import { ref } from "vue"
import Menu from "primevue/menu"
import Button from "primevue/button"
import Sidebar from "../SideBar.vue"
import SideBarItem from "../SideBarItem.vue"
import Breadcrumb from "../Breadcrumb.vue"
// import useAuthStore from "../../stores/useAuthStore"
import { useToast } from "primevue/usetoast"
// const auth = useAuthStore()
const auth = { username: "Hasinoor" }

const toast = useToast()
const menu = ref()
const variant = ref("expanded")
const variants = [
  {
    title: "Expanded",
    value: "expanded",
  },
  {
    title: "Condensed",
    value: "condensed",
  },
  {
    title: "Hidden",
    value: "hidden",
  },
]
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
      <template #header="{ sbVariant, sbFloating }: any">
        <div
          style="
            height: 60px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <transition
            enterActiveClass="animate__animated animate__slideInLeft"
            leaveActiveClass="animate__animated animate__slideOutLeft"
          >
            <h1
              v-if="sbVariant !== 'condensed' || sbFloating === true"
              class="sidebar-header-title"
            >
              Dashboard
            </h1>
          </transition>
          <transition
            enterActiveClass="animate__animated animate__slideInRight"
            leaveActiveClass="animate__animated animate__slideOutRight"
          >
            <h1
              v-if="sbVariant === 'condensed' && sbFloating === false"
              class="sidebar-header-title"
            >
              A
            </h1>
          </transition>
        </div>
      </template>
      <SideBarItem title="Home" exactActive to="/">
        <template #icon>
          <i class="pi pi-home"></i>
        </template>
      </SideBarItem>
      <SideBarItem title="Supplier" :exactActive="false" to="/supplier">
        <template #icon>
          <i class="pi pi-id-card"></i>
        </template>
      </SideBarItem>
      <SideBarItem title="Materials" :exactActive="false" to="/raw">
        <template #icon>
          <i class="pi pi-shield"></i>
        </template>
      </SideBarItem>
      <SideBarItem title="Employee" :exactActive="false" to="/employee">
        <template #icon>
          <i class="pi pi-users"></i>
        </template>
      </SideBarItem>
      <SideBarItem title="Products" :exactActive="false" to="/products">
        <template #icon>
          <i class="pi pi-database"></i>
        </template>
      </SideBarItem>
      <SideBarItem title="Orders" :exactActive="false" to="/orders">
        <template #icon>
          <i class="pi pi-shopping-bag"></i>
        </template>
      </SideBarItem>
      <SideBarItem title="Accounts" :exactActive="false" to="/accounts">
        <template #icon>
          <i class="pi pi-chart-bar"></i>
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
          <SideBarItem title="Team" to="/about/full-stack/hasinoor"></SideBarItem>
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
          <Menu
            id="overlay_menu"
            class="mt-2"
            ref="menu"
            :model="items"
            :popup="true"
          />
        </div>
      </div>
      <div class="flex-grow-1">
        <div class="p-4">
          <span class="p-float-label">
            <Dropdown
              :options="variants"
              optionValue="value"
              optionLabel="title"
              v-model="variant"
              placeholder="Sidebar Variant"
              id="dropdown"
            ></Dropdown
            ><label for="dropdown">Sidebar Variant</label></span
          >

          <Breadcrumb />
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.top-nav-bg {
  background-color: #ecf0f1;
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
}
.sidebar-header-title {
  color: aliceblue;
  position: absolute;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>
