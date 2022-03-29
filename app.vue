<script setup lang="ts">
const store = useStore()
useMeta({
  title: store.title,
  bodyAttrs: {
    class: 'bg-gray-300 dark:bg-black'
  },
  meta: [
    { name: 'theme-color', content: '#60009b' }
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
      <NuxtPage class="p-4" />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --red: #ef0040cc;
  --blue: #4960bbcc;
  --purple: #8020bbcc;
  --pink: #e02080cc;
}

* {
  letter-spacing: 0.05em;
}

@keyframes standard {
  0% {
    background-color: var(--pink);
  }
  50% {
    background-color: var(--purple);
  }
  100% {
    background-color: var(--pink);
  }
}

@keyframes alternative {
  0% {
    background-color: var(--red);
  }
  25% {
    background-color: var(--blue);
  }
  50% {
    background-color: var(--purple);
  }
  75% {
    background-color: var(--pink);
  }
  100% {
    background-color: var(--red);
  }
}

.custom-bg {
  animation: standard 6s linear infinite;
}

::selection {
  color: white;
  background-color: var(--purple);
}

li {
  @apply ml-4;
}
</style>
