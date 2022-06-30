<script setup lang="ts">
import Card from "primevue/card"
import { ref } from "vue"
const card = ref()
const isOpen = ref(true)
</script>
<template>
  <h1>Home page</h1>
  <Card style="margin: auto auto" ref="card">
    <template #title>Adminton</template>
    <template #content>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis facere molestiae
        eos deleniti, a tenetur repellendus atque labore sequi nobis quasi vel
        perspiciatis provident voluptatibus reiciendis eveniet ratione sunt laborum!
      </p>
    </template>
  </Card>
</template>
