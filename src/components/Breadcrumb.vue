<script setup lang="ts"></script>
<template>
  <div class="breadcrumb">
    <div class="breadcrumb-item" v-if="$route.path !== '/'">
      <RouterLink :to="{ name: 'Home' }">Home</RouterLink>
    </div>
    <div v-for="link in $route.matched" class="breadcrumb-item">
      <RouterLink :to="{ name: link.name, params: $route.params }">{{
        link.name
      }}</RouterLink>
    </div>
  </div>
</template>
<style>
.breadcrumb {
  display: flex;
  justify-content: start;
  margin: 15px auto;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
}
.breadcrumb-item > a {
  padding: 5px;
  text-decoration: none;
  color: rgb(69, 69, 69);
}
.breadcrumb-item > a.router-link-exact-active {
  color: darkgrey;
}
.breadcrumb-item:not(:first-child):before {
  content: "";
  font-family: primeicons;
  color: darkgrey;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
