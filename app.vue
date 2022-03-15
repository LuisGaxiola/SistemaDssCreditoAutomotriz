<script setup lang="ts">
const store = useStore()
useMeta({
  title: store.title,
  bodyAttrs: {
    class: 'bg-gray-300 dark:bg-black'
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <Header />
      <NuxtPage class="p-4" />
    </NuxtLayout>
  </div>
</template>

<style>
::selection {
  @apply bg-black text-white;
}

li {
  @apply ml-4;
}
</style>
