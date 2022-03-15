import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    title: 'Sistema DSS para crédito automotriz'
  })
})
