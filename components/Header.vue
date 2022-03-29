<script setup lang="ts">
const dark = useDark()
const off = useToggle(dark)

const store = useStore()
</script>

<template>
  <div class="sticky top-0 z-10 custom-bg backdrop-filter backdrop-blur-md text-white text-xl">
    <div class="flex items-center justify-between p-4 py-2">
      <div class="text-2xl font-black tracking-wider">{{ store.title }}</div>
      <button class="!outline-none" @click="off">
        <div v-if="dark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
    </div>
    <div class="flex justify-between items-center p-4 py-2">
      <div class="flex gap-6 sm:gap-8 font-light tracking-widest">
        <nuxt-link to="/" external class="flex items-center gap-2">
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
