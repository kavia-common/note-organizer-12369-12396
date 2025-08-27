import { createPinia } from 'pinia'

/**
 * PUBLIC_INTERFACE
 * Nuxt plugin to install Pinia for both SSR and client.
 * Ensures stores can be used safely from composables and setup() anywhere.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
  nuxtApp.provide('pinia', pinia)
})
