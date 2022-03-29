<script setup lang="ts">
import { ref, Ref } from "@vue/reactivity"
import { computed, inject, useSlots, watchEffect } from "@vue/runtime-core"
import { RouteLocationNormalizedLoaded } from "vue-router"
const lastClick = inject<Ref<MouseEvent>>("lastClick")
const route = inject<RouteLocationNormalizedLoaded>("route")
const props = defineProps({
  to: { type: String, required: true },
  title: { type: String, required: true },
  exactActive: { type: Boolean, default: false },
})
const slots = useSlots()
const initActive = () => {
  if (!props.to) {
    return false
  }
  if (props.exactActive) {
    return route!.path === props.to
  }
  return route!.path.includes(props.to)
}
const isActive = ref(initActive())
const itemHeaderEl = ref()
const itemBlock = ref()
const itemChild = ref()
watchEffect(() => {
  if (lastClick!.value && itemHeaderEl.value && itemHeaderEl.value.isSameNode) {
    if (
      itemHeaderEl.value?.isSameNode(lastClick!.value.target) ||
      itemHeaderEl.value?.contains(lastClick!.value.target)
    ) {
      isActive.value = !isActive.value
    } else if (!itemBlock.value?.contains(lastClick!.value.target)) {
      isActive.value = false
    }
  }
})
const childHeight = computed(() =>
  itemChild.value ? itemChild.value.scrollHeight + "px" : "0px"
)
const hasChild = computed(() => slots.default && slots.default().length > 0)
</script>
<template>
  <div :class="{ 'sb-item': true, active: isActive }" ref="itemBlock">
    <a v-if="hasChild" :href="to" @click.prevent class="sb-item--header" ref="itemHeaderEl">
      <div class="sb-item--icon" v-if="slots.icon">
        <slot name="icon" />
      </div>
      <div class="sb-item--title">{{ title }}</div>
      <div class="sb-item--indicator" v-if="hasChild">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 18">
          <path
            fill="currentColor"
            d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          />
        </svg>
      </div>
    </a>
    <router-link v-else :to="to" class="sb-item--header" ref="itemHeaderEl">
      <div class="sb-item--icon" v-if="slots.icon">
        <slot name="icon" />
      </div>
      <div class="sb-item--title">{{ title }}</div>
      <div class="sb-item--indicator" v-if="hasChild">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 18">
          <path
            fill="currentColor"
            d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          />
        </svg>
      </div>
    </router-link>
    <transition name="slide">
      <div class="sb-item--child" ref="itemChild" v-if="isActive">
        <slot />
      </div>
    </transition>
  </div>
</template>
<style>
.sb-item {
  padding: 0;
  margin-top: 3px;
  text-decoration: none;
}

.sb-item--header {
  display: flex;
  flex-shrink: 1;
  flex-direction: row;
  gap: 1rem;
  color: var(--sb-item-color);
  transition: all 0.3s ease;
  padding: 3px 12px;
  min-height: 36px;
  text-decoration: none;
  font-size: 1.1rem;
}
.sb-item.active > .sb-item--header,
.sb-item--header:hover {
  color: var(--sb-active-item-color);
  background: var(--sb-active-item-bg);
}
.sb-item--title {
  flex-grow: 1;
  align-self: center;
  transition: font-weight 0.3s ease;
}
.sb-item--icon {
  align-self: center;
}
.sb-item--indicator {
  padding: 0;
  transition: transform 0.3s ease;
  transform: rotate(90deg);
  font-size: 1.5rem;
  align-self: center;
}
.sb-item.active > .sb-item--header > .sb-item--indicator {
  transform: rotate(-90deg);
}
.slide-enter-active,
.slide-leave-active {
  transition: height 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  height: 0;
}
.slide-enter-to,
.slide-leave-from {
  height: v-bind(childHeight);
}
.sb-item--child {
  margin-left: 0px;
  transition: all 0.3s ease;
}
.sidebar-container:not(.sidebar-condensed:not(.sidebar-floating))
  .sb-item--child {
  overflow: hidden;
  margin-left: 10px;
}
.sidebar-condensed:not(.sidebar-floating) .sb-item--title:not(:nth-child(2)) {
  font-size: 0rem;
}
.sidebar-condensed:not(.sidebar-floating)
  .sb-item--title:not(:nth-child(2))::first-letter {
  font-size: 1.1rem !important;
  font-weight: bold;
}
</style>
