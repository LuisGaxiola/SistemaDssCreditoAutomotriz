<script setup lang="ts">
const store = useStore()
const router = useRouter()
</script>

<template>
  <Card>
    <LoginDialog>
      <Calculadora />
    </LoginDialog>
  </Card>
</template>
