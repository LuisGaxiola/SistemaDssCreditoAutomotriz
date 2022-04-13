<script setup lang="ts">
const store = useStore()
const router = useRouter()
</script>

<template>
  <div>
    <div v-if="store.state.usuario.id == 0" class="flex flex-col gap-2">
      <div>Necesita iniciar sesión para hacer esta acción</div>
      <button class="block" @click="router.push('/login')">Iniciar sesión</button>
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>
