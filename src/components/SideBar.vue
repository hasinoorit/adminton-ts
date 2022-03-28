<script setup lang="ts">
import { computed } from "@vue/reactivity"
import { provide, ref, unref, watchEffect } from "@vue/runtime-core"
import { useRoute } from "vue-router"

const isFloating = ref(false)
const sidebarEl = ref<HTMLDivElement>()
const emit = defineEmits<{
  (e: "update:floating", value: boolean): void
}>()

const props = defineProps({
  variant: {
    type: String,
    default: "expanded",
    validator(value: string) {
      // The value must match one of these strings
      return ["expanded", "condensed", "hidden"].includes(value)
    },
  },
  floating: Boolean,
})

const finalFloating = computed<boolean>({
  get: (): boolean => {
    if (props.variant === "expanded") {
      return false
    }
    return props.variant === "hidden" && typeof props.floating !== "undefined"
      ? unref(props.floating)
      : unref(isFloating)
  },
  set: (v: boolean) => {
    if (props.variant === "hidden" && typeof props.floating !== "undefined") {
      emit("update:floating", v)
    } else {
      isFloating.value = v
    }
  },
})

const domClickListener = ($e: MouseEvent) => {
  if (!sidebarEl!.value!.contains(<Node>$e.target)) {
    emit("update:floating", false)
    window.removeEventListener("click", domClickListener)
  }
}

watchEffect(() => {
  if (props.variant === "hidden" && finalFloating.value === true) {
    setTimeout(() => {
      window.addEventListener("click", domClickListener)
    }, 0)
  } else {
    window.removeEventListener("click", domClickListener)
  }
})

const route = useRoute()
const lastClick = ref<MouseEvent>()

provide("lastClick", lastClick)
provide("route", route)

const emitClick = ($e: MouseEvent) => {
  lastClick.value = $e
}
const mouseEnter = ($e: MouseEvent) => {
  if (props.variant === "condensed") {
    finalFloating.value = true
  }
}
const mouseLeave = ($e: MouseEvent) => {
  if (props.variant === "condensed") {
    finalFloating.value = false
  }
}
</script>
<template>
  <div
    :class="{
      'sidebar-container': true,
      'sidebar-expanded': props.variant === 'expanded',
      'sidebar-condensed': props.variant === 'condensed',
      'sidebar-hidden': props.variant === 'hidden',
      'sidebar-floating': finalFloating,
    
    }"
    ref="sidebarEl"
  >
    <div
      class="sidebar-content"
      @click="emitClick"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <slot />
    </div>
  </div>
</template>

<style>
.sidebar-container {
  padding: 0;
  min-height: 100vh;
  height: 100%;
  width: 0;
  transition: all 0.3s ease;
  z-index: 1;
  display: flex;
  flex-direction: column;
}
.sidebar-condensed {
  width: 40px;
}
.sidebar-hidden {
  width: 0px;
}

.sidebar-expanded {
  width: 200px;
}

.sidebar-content {
  --background: #2c3e50;
  background: var(--background);
  overflow: hidden;
  height: 100%;
  width: 0px;
  transition: width 0.3s ease;
  z-index: 100;
  flex-grow: 1;
}

.sidebar-expanded > .sidebar-content {
  width: 200px;
}
.sidebar-hidden > .sidebar-content {
  width: 0px;
}
.sidebar-condensed > .sidebar-content {
  width: 40px;
}
.sidebar-container.sidebar-floating > .sidebar-content {
  width: 200px;
}
</style>
