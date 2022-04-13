<script setup lang="ts">
const store = useStore()
const colorPrimary = ref('#808080')
const colorPrimaryTransparent = computed(() => `${colorPrimary.value}cc`)
const colorSecondary = ref('#404040')
const colorSecondaryTransparent = computed(() => `${colorSecondary.value}cc`)
useHead({
  title: store.state.title,
  bodyAttrs: {
    class: 'bg-gray-300 dark:bg-black'
  },
  meta: [
    { name: 'theme-color', content: colorPrimary.value }
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg' }
  ]
})
</script>

<template>
  <div>
    <NuxtLayout>
      <Header />
      <NuxtPage class="my-4" />
    </NuxtLayout>
  </div>
</template>

<style>
* {
  letter-spacing: 0.05em;
}

@keyframes standard {
  0% {
    background-color: v-bind(colorPrimaryTransparent);
  }
  50% {
    background-color: v-bind(colorSecondaryTransparent);
  }
  100% {
    background-color: v-bind(colorPrimaryTransparent);
  }
}

.bg-custom {
  animation: standard 6s ease infinite;
}

::selection {
  @apply bg-dark-900 text-white dark:(bg-light-200 text-black);
}

button {
  @apply bg-dark-900 text-white flex items-center gap-2 dark:(bg-light-200 text-black) p-3 rounded font-semibold tracking-widest !important;
}

li {
  @apply ml-4;
}
</style>
