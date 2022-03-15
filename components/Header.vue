<script setup lang="ts">
const dark = useDark()
const off = useToggle(dark)

const store = useStore()
</script>

<template>
  <div class="sticky top-0 z-10 custom-bg backdrop-filter backdrop-blur-sm text-white text-xl">
    <div class="flex items-center justify-between p-4 py-2">
      <div class="text-2xl font-bold">{{ store.title }}</div>
      <button class="!outline-none" @click="off">
        <div v-if="dark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
    </div>
    <div class="flex justify-between items-center p-4 py-2">
      <div class="flex gap-9">
        <nuxt-link to="/" class="flex items-center gap-2">
          <div>Inicio</div>
          <div class="i-carbon-home" />
        </nuxt-link>
        <nuxt-link to="/participantes" class="flex items-center gap-2">
          <div>Presentación</div>
          <div class="i-carbon-user-multiple" />
        </nuxt-link>
      </div>
      <nuxt-link to="/detalles" class="flex items-center gap-2">
        <div class="i-carbon-information" />
      </nuxt-link>
    </div>
  </div>
</template>

<style>
:root {
  --green: #20c060e6;
  --blue: #00266de6;
  --red: #ff6060e6;
  --purple: #77216fe6;
  --pink: #b3004be6;
  --orange: #ff8040e6;
}
@keyframes changeColor {
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
.custom-bg {
  animation: changeColor 8s linear infinite;
}
</style>
