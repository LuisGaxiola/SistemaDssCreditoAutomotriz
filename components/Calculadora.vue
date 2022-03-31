<script setup lang="ts">
import { z } from 'zod'

const paso2 = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  precio: z.number(),
  cantidad: z.number(),
  total: z.number(),
})

const nombreAgencia = ref('Agencia Automotriz Tesla')
const sloganAgencia = ref('Más cosas a peores precios ♪')
const pasoActual = ref(1)
const planes = await useFetch('/api/getPlanes')
const autos = await useFetch('/api/getAutos')
const currentDate = useNow()
const fecha = useDateFormat(currentDate, 'DD/MM/YYYY')
const curp = ref('')
const nombre = ref('')
const domicilio = ref('')
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
    const persona = await useFetch('/api/getPersonaByCurp', { method: 'post', body: curp.value })
    nombre.value = persona.data.value.nombre || ''
    domicilio.value = persona.data.value.domicilio || ''
  }
})

function getAutoByPlan(plan: number) {
  return autos.data.value.find(auto => auto.plan === plan)
}
function getAutosByPlan(plan: number) {
  return autos.data.value.filter(auto => auto.plan === plan)
}
const idAutoSeleccionado = ref(0)
watch(planSugerido, () => {
  idAutoSeleccionado.value = 0
})

const autoSeleccionado = computed(() => autos.data.value.find(auto => auto.clave === idAutoSeleccionado.value))
const enganche = computed(() => parseFloat((autoSeleccionado.value.valorComercial * 0.2).toFixed(2)))
const valorMenosEnganche = computed(() => parseFloat((autoSeleccionado.value.valorComercial - enganche.value).toFixed(2)))
const cantidadFinanciar = computed(() => valorMenosEnganche.value + (valorMenosEnganche.value * 0.35))
const meses = ref(60)
const mensualidad = computed(() => parseFloat((cantidadFinanciar.value / meses.value).toFixed(2)))



function getFutureMonths(months: number) {
  const currentDate = new Date()
  const newDate = new Date(currentDate.setMonth(currentDate.getMonth()+months))
  return useDateFormat(newDate, 'DD/MM/YYYY')
}

function reiniciar() {
  location.reload()
}
function dinero(money: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    currencySign: 'accounting'
  }).format(money);
}
</script>

<template>
  <Card>
    <div class="mb-6 text-3xl">
      <div class="flex font-black gap-2">
        <div>{{ nombreAgencia }}</div>
        <div class="text-8xl sm:text-4xl i-mdi-car" />
      </div>
      <div class="text-xl tracking-widest">{{ sloganAgencia }}</div>
    </div>
    <div v-if="pasoActual === 1">
      <div class="font-black text-2xl">Nuestros planes de financiamiento</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        <div v-for="(plan, index) in planes.data.value" :key="index">
          <Menu>
            <template #head>
              <div
                class="planes p-6 text-white tracking-widest font-bold rounded"
                :style="{ backgroundColor: plan.color }"
              >
                <div class="text-3xl">#{{ plan.id }}</div>
                <div class="font-bold">{{ plan.nombre }}</div>
                <div
                  class="font-light"
                >{{ `Autos desde ${dinero(plan.valorMinimo)} hasta ${dinero(plan.valorMaximo)}` }}</div>
              </div>
            </template>
            <template #menu>
              <ClientOnly>
                <Card theme="inverted">
                  <div class="font-bold">Ejemplo</div>
                  <div
                    class="font-light"
                  >{{ getAutoByPlan(plan.id).nombre }} ({{ dinero(getAutoByPlan(plan.id).valorComercial) }})</div>
                  <img class="my-2 w-64 rounded" :src="`/${getAutoByPlan(plan.id).urlImagen}`" />
                </Card>
              </ClientOnly>
            </template>
          </Menu>
        </div>
      </div>
      <div class="flex justify-end mt-4 gap-4">
        <button @click="pasoActual += 1">
          <div>Continuar</div>
          <div class="i-mdi-arrow-right-thick" />
        </button>
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
      <Input
        title="Hijos"
        type="number"
        min="0"
        v-model="hijos"
        :disabled="estadoCivil == 'soltero'"
      />
      <Input title="Ingresos mensuales" type="number" min="0" v-model="ingresosMensuales" />
      <Input
        title="Ingresos acumulables"
        type="number"
        :disabled="true"
        v-model="ingresosAcumulables"
      />
      <Input
        title="Plan recomendado"
        type="text"
        disabled
        v-model="planSugeridoNombre"
        class="text-white font-semibold tracking-wider"
        :style="{ backgroundColor: planes.data.value[planSugerido - 1].color }"
      />
      <div class="flex justify-between gap-4 mt-4">
        <button @click="pasoActual -= 1">
          <div>Atrás</div>
          <div class="i-mdi-arrow-left-thick" />
        </button>
        <button @click="pasoActual += 1">
          <div>Continuar</div>
          <div class="i-mdi-arrow-right-thick" />
        </button>
      </div>
    </div>
    <div v-else-if="pasoActual === 3" class="flex flex-col gap-2">
      <div class="font-black text-2xl">Resumen de la adquisición del plan automotriz</div>
      <div class="gap-2">
        <span class="font-bold">Plan sugerido</span>
        <div
          class="p-4 rounded cursor-not-allowed text-white font-semibold tracking-wider"
          :style="{ backgroundColor: planes.data.value[planSugerido - 1].color }"
        >{{ planSugeridoNombre }}</div>
      </div>
      <div class="font-bold">Tipo de auto</div>
      <div class="bg-gray-200 text-black rounded w-full">
        <select
          class="border-none bg-transparent outline-none py-2 pl-2 w-full"
          v-model="idAutoSeleccionado"
        >
          <option v-for="auto in getAutosByPlan(planSugerido)" :value="auto.clave">{{ auto.nombre }}</option>
        </select>
      </div>
      <div v-if="idAutoSeleccionado > 0" class="flex flex-col justify-between sm:flex-row-reverse gap-2">
        <div class=" w-full sm:w-1/2">
          <img class="rounded-md w-full" :src="`/${autoSeleccionado.urlImagen}`" :alt="autoSeleccionado.nombre" />
        </div>
        <div>
          <div>
            <span class="font-bold">Clave del auto:</span>
            {{ autoSeleccionado.clave }}
          </div>
          <div>
            <span class="font-bold">Valor comercial:</span>
            {{ dinero(autoSeleccionado.valorComercial) }}
          </div>
          <div>
            <span class="font-bold">Enganche:</span>
            {{ dinero(enganche) }}
          </div>
          <div>
            <span class="font-bold">Cantidad a financiar:</span>
            {{ dinero(cantidadFinanciar) }}
          </div>
          <div>
            <span class="font-bold">Meses:</span>
            {{ meses }}
          </div>
          <div>
            <span class="font-bold">Mensualidad:</span>
            {{ dinero(mensualidad) }}
          </div>
        </div>
      </div>
      <div class="flex justify-between gap-4 mt-4">
        <button @click="pasoActual -= 1">
          <div>Atrás</div>
          <div class="i-mdi-arrow-left-thick" />
        </button>
        <button @click="pasoActual += 1">
          <div>Continuar</div>
          <div class="i-mdi-arrow-right-thick" />
        </button>
      </div>
    </div>
    <div v-else-if="pasoActual === 4" class="flex flex-col gap-4">
      <div class="font-black text-2xl">Comprobante de enganche</div>
      <Card theme="inverted">
        <div class="font-bold flex justify-between">
          <div>Ficha de pago</div>
          <div>Fecha: {{ fecha }}</div>
        </div>
        <br />
        <div
          class="font-light"
        >Comprobante de pago por la cantidad de: {{ dinero(enganche) }}, por concepto de enganche por la compra y adquisición de un automovil {{ autoSeleccionado.nombre }}</div>
      </Card>
      <div class="font-black text-2xl">Fichas de pago por mensualidad</div>
      <Card theme="inverted" v-for="x of 60">
        <div class="font-bold flex justify-between">
          <div>Ficha de pago de la mensualidad #{{ x }}</div>
          <div>Fecha: {{ getFutureMonths(x).value }}</div>
        </div>
        <br />
        <div
          class="font-light"
        >Comprobante de pago por la mensualidad de {{ dinero(mensualidad) }}, por concepto de pago de la mensualidad número: {{ x }}, por la compra y adquisición de un automovil {{ autoSeleccionado.nombre }}</div>
      </Card>
      <div class="flex justify-between gap-4 mt-4">
        <button @click="pasoActual -= 1">
          <div>Atrás</div>
          <div class="i-mdi-arrow-left-thick" />
        </button>
        <button @click="reiniciar">
          <div>Reiniciar</div>
          <div class="i-mdi-arrow-u-left-top-bold" />
        </button>
      </div>
    </div>
  </Card>
</template>

<style scoped>
button {
  @apply bg-dark-900 text-white flex items-center gap-2 dark:(bg-light-200 text-black) p-3 px-5 rounded font-semibold tracking-widest;
}
</style>
