<script setup lang="ts">
const props = withDefaults(defineProps<{
  theme?: 'normal' | 'inverted'
}>(), {
  theme: 'normal'
})
</script>

<template>
  <div
    class="rounded-md p-4"
    :class="{
      'bg-white dark:bg-dark-600 text-black dark:text-white': theme === 'normal',
      'bg-dark-600 dark:bg-white text-white dark:text-black': props.theme === 'inverted'
    }"
  >
    <slot />
  </div>
</template>