<script setup lang="ts">
const store = useStore()
const router = useRouter()
const data = refReset({
  login: '',
  password: ''
})

async function iniciarSesión() {
  const { data: usuarioCorrecto } = await useFetch('/api/login', { method: 'post', body: { login: data.value.login, password: data.value.password } })
  if (usuarioCorrecto.value != false) {
    const { id, nombre } = usuarioCorrecto.value
    store.state.usuario = { id, nombre }
    router.back()
  } else {
    alert('Error, usuario o contraseña incorrectos')
  }
}
</script>

<template>
  <Card>
    <h1 class="text-2xl font-bold mb-4">Iniciar sesión</h1>
    <div class="flex flex-col gap-2">
      <Input v-model="data.login" title="Usuario" />
      <Input @keypress.enter="iniciarSesión" v-model="data.password" title="Contraseña" type="password" />
    </div>
    <button class="mt-4" @click="iniciarSesión">Iniciar sesión</button>
  </Card>
</template>