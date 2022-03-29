<script setup lang="ts">
// menu like quasar
const slots = useSlots()
const target = ref(null)
const targetBounding = useElementBounding(target)

const windowSize = useWindowSize()
const menu = ref(null)
const { isOutside } = useMouseInElement(menu)
const isTargetFullyVisible = computed(() => targetBounding.bottom.value > windowSize.height.value)
</script>

<template>
    <div ref="menu" class="relative">
        <slot name="head" />
        <div
            ref="target"
            class="absolute z-10 my-2"
            :class="{
                'invisible': isOutside,
                'top-full': isTargetFullyVisible,
                'bottom-full': !isTargetFullyVisible
            }"
        >
            <slot name="menu" />
        </div>
    </div>
</template>
