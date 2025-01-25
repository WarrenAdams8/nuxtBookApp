// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },
  compatibilityDate: "2025-01-25",
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css']
})