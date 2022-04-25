<script setup lang="ts">
const target = ref(null)
const targetBounding = useElementBounding(target)
const windowSize = useWindowSize()
const menu = ref(null)
const menuBounding = useElementBounding(menu)
const { x, y, sourceType } = useMouse()
const isOutside = computed(() => {
  const { left, top, width, height } = menuBounding
  const { width: windowWidth, height: windowHeight } = windowSize
  return (
    x.value < left.value ||
    x.value > left.value + width.value ||
    y.value < top.value ||
    y.value > top.value + height.value ||
    sourceType.value !== 'mouse' ||
    (windowWidth.value < left.value + width.value && windowHeight.value < top.value + height.value)
  )
})
const isTargetFullyVisible = computed(() => targetBounding.bottom.value > windowSize.height.value)
</script>

<template>
  <div ref="menu" class="relative">
    <slot name="head" />
    <div ref="target" class="absolute z-10 my-2" :class="{
      'invisible': isOutside,
      'top-full': isTargetFullyVisible,
      'bottom-full': !isTargetFullyVisible
    }">
      <slot name="menu" />
    </div>
  </div>
</template>
