<script lang="ts" setup>
import { MaybeElementRef } from "@/lib/utility/unrefElement"
const input = ref<MaybeElementRef>()
</script>
<template>
  <div>
    <input type="text" v-model="modelValue" readonly @click="click" ref="input" />
    <Popper v-if="isOpen" :target="input" @clickoutside="click">
      <div
        v-for="option in options"
        :key="option"
        @click="change(option)"
        :class="{ 'select-option': true, selected: option === modelValue }"
      >
        {{ option }}
      </div>
    </Popper>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import Popper from "./Popper.vue"

export default defineComponent({
  name: "Select",
  props: ["modelValue", "options"],
  emits: ["update:modelValue", "change", "input"],
  components: { Popper },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    data: {
      get() {
        return this.modelValue
      },
      set(v: any) {
        this.$emit("update:modelValue", v)
      },
    },
    // pos() {
    //   return useElementBounding(input as MaybeElementRef);
    // }
  },
  methods: {
    click() {
      this.isOpen = !this.isOpen
    },
    change(v: any) {
      this.$emit("update:modelValue", v)
      this.isOpen = false
    },
  },
})
</script>
<style>
.select-option {
  padding: 2px;
  margin: 2px;
}
.select-option:hover {
  background: #e8ffea;
}
.select-option.selected {
  background: #e8e8ff;
}
</style>
