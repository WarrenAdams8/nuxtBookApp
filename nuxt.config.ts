// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },
  compatibilityDate: "2025-01-25",
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],

  imports: {
    dirs: [
      '../shared/types',
      '../shared/utils'
    ]
  },
  nitro: {
    imports: {
      dirs: [
        '../shared/types',
        '../shared/utils'
      ]
    }
  }
})