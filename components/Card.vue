<script setup lang="ts">import { boolean } from 'zod';

const props = withDefaults(defineProps<{
  theme?: 'normal' | 'inverted'
  padding?: boolean
}>(), {
  theme: 'normal',
  padding: true
})
</script>

<template>
  <div
    class="rounded-lg"
    :class="{
      'p-4': padding,
      'bg-white dark:bg-dark-600 text-black dark:text-white': theme === 'normal',
      'bg-dark-600 dark:bg-white text-white dark:text-black': props.theme === 'inverted'
    }"
  >
    <slot />
  </div>
</template>