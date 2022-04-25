import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@pinia/nuxt'],
  css: [
    '@unocss/reset/tailwind.css'
  ]
})
