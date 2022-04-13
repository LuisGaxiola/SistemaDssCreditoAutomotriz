import { defineStore } from 'pinia'
import type { usuario } from '../server/data'

export const useStore = defineStore('store', () => {
  const state = ref({
    title: 'Sistema DSS para crédito automotriz',
    usuario: {
      id: 0,
      nombre: ''
    } as Pick<usuario, 'id' | 'nombre'>
  })

  return { state }
})
