<script setup lang="ts">
const fecha = useDateFormat(useNow(),'DD/MM/YYYY')
const participantes = ref([
  'Jennifer Eliany Felix Rejon (19030712)',
  'Juan Manuel Valdez Felix (19030007)',
  'Jazmin Guadalupe Hernandez Rodriguez (19030545)',
  'Jose Abel Juarez Ramirez (19030366)',
  'Maria Lourdes Padilla Moroyoqui (19031164)',
  'Jose Luis Gaxiola Lopez (19031058)'
])
</script>

<template>
  <div class="font-bold">Universidad Autónoma de Occidente</div>
  <div><span class="font-bold">Carrera:</span> Licenciatura en sistemas computacionales</div>
  <div><span class="font-bold">Docente:</span> Jesús López Figueroa</div>
  <div><span class="font-bold">Materia:</span> Sistemas para la toma de decisiones</div>
  <div><span class="font-bold">Tema:</span> Sistema para crédito automotriz</div>
  <div><span class="font-bold">Fecha:</span> {{ fecha }}</div>
  <div class="font-bold">Autores:</div>
  <ul>
    <li v-for="(participante, index) in participantes" :key="index">{{ participante }}</li>
  </ul>
</template>