<script setup lang="ts">
const dark = useDark()
const off = useToggle(dark)
const store = useStore()
const logout = useLogout()
const router = useRouter()
</script>

<template>
  <div class="sticky tracking widest top-0 z-10 bg-white text-black dark:(bg-dark-600 text-white bg-opacity-80) bg-opacity-80 backdrop-filter backdrop-blur-md text-xl">
    <div class="flex items-center justify-between px-4 py-2">
      <div class="text-2xl font-black tracking-wider">{{ store.state.title }}</div>
      <div class="flex items-center gap-6">
        <div class="font-light tracking-wider">Bienvenido/a {{ store.state.usuario.id > 0 ? store.state.usuario.nombre : 'forastero' }}!</div>
        <button v-if="store.state.usuario.id > 0" @click="logout">Cerrar sesión</button>
        <button v-else @click="router.push('/login')">Iniciar sesión</button>
      </div>
    </div>
    <div class="flex justify-between items-center px-4 py-2">
      <div class="flex gap-4 sm:gap-6 font-light">
        <nuxt-link to="/" class="flex items-center gap-2">
          <div>Inicio</div>
          <div class="i-carbon-home" />
        </nuxt-link>
        <nuxt-link to="/participantes" class="flex items-center gap-2">
          <div>Presentación</div>
          <div class="i-carbon-user-multiple" />
        </nuxt-link>
      </div>
      <div class=" flex items-center gap-4">
        <nuxt-link to="/detalles" class="flex items-center gap-2">
        <div class="i-carbon-information" />
      </nuxt-link>
      <button class="!outline-none" @click="off">
        <div v-if="dark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
      </div>
    </div>
  </div>
</template>
