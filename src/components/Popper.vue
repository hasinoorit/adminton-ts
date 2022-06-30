<script setup lang="ts">
import { MaybeElementRef } from "@/lib/utility/unrefElement"
import { computed, ref, unref } from "@vue/runtime-core"
import { useElementBounding } from "@/lib/utility/useElementBounding"
import useEventListener from "@/lib/utility/useEventListener"
import { StyleValue } from "vue"
const props = defineProps({
  target: { type: Object as () => MaybeElementRef },
})
const emit = defineEmits(["clickoutside"])
const elm = ref()

const { height, width, left, right, x, y, top, bottom } = useElementBounding(
  props.target
)
const elPos = useElementBounding(elm)
const style = computed(() => {
  const st: StyleValue = {
    position: "fixed",
    left: left.value + "px",
    width: width.value + "px",
    top: bottom.value + "px",
  }
  if (window.innerHeight < bottom.value + elPos.height.value) {
    st.top = top.value - elPos.height.value + "px"
  }
  return st
})

const clickListener = ($e: any) => {
  const mInput = unref(props.target)
  const mElm = unref(elm)
  if (!mInput?.contains($e.target) && !mElm?.contains($e.target)) {
    emit("clickoutside", true)
  }
}
useEventListener("click", clickListener)
</script>
<template>
  <Teleport to="body">
    <div :style="style" ref="elm" class="popper">
      <slot />
    </div>
  </Teleport>
</template>
<style>
.popper {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(5px);
  border: 1px solid gray;
  padding: 7px;
  border-radius: 3px;
  padding: 0;
  max-height: 30vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.popper ul {
  list-style: none;
  padding: 0;
}
</style>
