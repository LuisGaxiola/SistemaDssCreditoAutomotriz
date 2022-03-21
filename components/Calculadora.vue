<script setup lang="ts">
const nombreAgencia = ref('Agencia Automotriz Tesla')
const sloganAgencia = ref('Más cosas a peores precios ♪')
const pasoActual = ref(1)
const planes = await useFetch('/api/planes')
const fecha = useDateFormat(useNow(),'DD/MM/YYYY')
const curp = refDefault(ref(''),'')
const nombre = refDefault(ref(''),'')
const domicilio = refDefault(ref(''), '')
const estadoCivil = ref<'soltero' | 'casado'>('soltero')
const hijos = ref(0)
const ingresosMensuales = ref(0)
const ingresosAcumulables = computed(() => {
  let puntaje = 1
  if (estadoCivil.value == 'soltero') { puntaje = 0.8 }
  else if (estadoCivil.value == 'casado' && hijos.value == 0) { puntaje = 0.7 }
  else if (estadoCivil.value == 'casado' && hijos.value == 1) { puntaje = 0.6 }
  else if (estadoCivil.value == 'casado' && hijos.value == 2) { puntaje = 0.55 }
  else if (estadoCivil.value == 'casado' && hijos.value >= 3) { puntaje = 0.5 }
  return parseFloat((ingresosMensuales.value * puntaje).toFixed(2))
})
const planSugerido = computed(() => {
  if (ingresosAcumulables.value <= 5000) { return 1 }
  else if (ingresosAcumulables.value >= 5001 && ingresosAcumulables.value <= 10000) { return 2 }
  else if (ingresosAcumulables.value >= 10001 && ingresosAcumulables.value <= 18000) { return 3 }
  else if (ingresosAcumulables.value >= 18001) { return 4 }
})
const planSugeridoNombre = computed(() => planes.data.value[planSugerido.value - 1].nombre)

watch(curp, async () => {
  nombre.value = undefined
  domicilio.value = undefined
  if (curp.value.length === 18) {
    const persona = await useFetch('/api/personas', { method: 'post', body: curp.value })
    nombre.value = persona.data.value.nombre || ''
    domicilio.value = persona.data.value.domicilio || ''
  }
})

/*
TODOS LOS PLANES MANEJAN EL 20% DE ENGANCHE
Y COBRAN EL 35% DE INTERES A LA CANTIDAD A FINANCIAR
Y SE FINANCIAN A 60 MESES.
*/

const key = ref(0)
function reiniciar () {
  location.reload()
}
</script>

<template>
  <Card :key="key">
    <div class="mb-6 text-3xl">
      <div class="flex items-center font-black gap-2">
        <div>{{ nombreAgencia }}</div>
        <div class="text-4xl i-carbon-car" />
      </div>
      <div class="text-xl font-medium">"{{ sloganAgencia }}"</div>
    </div>
    <div v-if="pasoActual === 1">
      <div class="font-black text-2xl">Nuestros planes de financiamiento:</div>
      <div class="grid grid-cols-2 gap-4 my-4">
        <div
          v-for="(plan, index) in planes.data.value"
          :key="index"
          class="p-6 text-white tracking-widest font-bold rounded"
          :style="{ backgroundColor: plan.color }"
        >
          <div class="text-2xl">#{{ plan.id }}</div>
          <div>{{ plan.nombre }}</div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="pasoActual += 1">Continuar</button>
      </div>
    </div>
    <div v-else-if="pasoActual === 2" class="flex flex-col gap-4">
      <div class="text-lg flex justify-end">
        <div>
          <span class="font-bold">Fecha:</span>
          {{ fecha }}
        </div>
      </div>
      <Input title="CURP" type="text" maxlength="18" v-model="curp" />
      <Input title="Nombre del cliente" type="text" disabled v-model="nombre" />
      <Input title="Domicilio" type="text" disabled v-model="domicilio" />
      <div>
        <div class="font-bold">Estado civil</div>
        <div class="flex items-center gap-1">
          <input type="radio" value="soltero" v-model="estadoCivil" />
          <div>Soltero</div>
        </div>
        <div class="flex items-center gap-1">
          <input type="radio" value="casado" v-model="estadoCivil" />
          <div>Casado</div>
        </div>
      </div>
      <Input title="Hijos" type="number" min="0" v-model="hijos" :disabled="estadoCivil == 'soltero'" />
      <Input title="Ingresos mensuales" type="number" min="0" v-model="ingresosMensuales" />
      <Input title="Ingresos acumulables" type="number" disabled v-model="ingresosAcumulables" />
      <Input title="Plan recomendado" type="text" disabled v-model="planSugeridoNombre" class="text-white font-semibold tracking-wider" :style="{ backgroundColor: planes.data.value[planSugerido-1].color }" />
      <div class="flex justify-between mt-4">
        <button @click="pasoActual -= 1">Atrás</button>
        <button @click="pasoActual += 1">Continuar</button>
      </div>
    </div>
    <div v-else-if="pasoActual === 3" class="gap-2">
      <div class="font-black text-2xl">Resumen de la adquisición del plan automotriz:</div>
      <br>
      <div><Input title="Plan Sugerido" type="text" v-model="planSugeridoNombre" disabled />(APARECER AUTOMATICAMENTE)</div>
      
      <div><span class="font-bold">Clave del auto:</span> L1</div>
      <div><span class="font-bold">Tipo de auto:</span> SENTRA</div>
      <div><span class="font-bold">Valor comercial:</span> 300,000.00</div>
      <div v-if="true">
        <div>(YA QUE SE SELECCIONA EL AUTO)</div>
        <div><span class="font-bold">Enganche:</span> 60,000.00</div>
        <div><span class="font-bold">Cantidad a financiar:</span> 324,000.00</div>
        <div><span class="font-bold">Meses:</span> 60</div>
        <div><span class="font-bold">Mensualidad:</span> 5,400.00</div>
      </div>
      <div class="flex justify-between mt-4">
        <button @click="pasoActual -= 1">Atrás</button>
        <button @click="pasoActual += 1">Continuar (Imprimir fichas de pago)</button>
      </div>
    </div>
    <div v-else-if="pasoActual === 4" class="gap-2">
      <div class="font-black text-2xl">Impresión de fichas de pago:</div>
      <br>
      <div class="custom-bg p-4 rounded text-white">
        <div>Ficha de pago. Fecha: 09/03/2021</div>
        <div>Comprobante de pago por la cantidad de: (ENGANCHE), por concepto de enganche por la compra y adquisición de un automovil **MARCA** **MODELO**</div>
      </div>
      <br>
      <div class="custom-bg p-4 rounded text-white">
        <div>Ficha de pago de la mensualidad</div>
        <div>Comprobante de pago por la mensualidad de (MENSUALIDAD), por concepto de pago de la mensualidad número: 1, por la compra y adquisición de un automovil **MARCA** **MODELO**</div>
      </div>
      <div class="flex justify-between mt-4">
        <button @click="pasoActual -= 1">Atrás</button>
        <button @click="reiniciar">Reiniciar (Ir a página principal)</button>
      </div>
    </div>
  </Card>
</template>

<style scoped>
button {
  @apply bg-dark-900 text-white dark:(bg-light-200 text-black) p-4 px-8 rounded font-semibold tracking-widest;
}
</style>
