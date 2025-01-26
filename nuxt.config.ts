// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },
  compatibilityDate: "2025-01-25",
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxthub/core'
  ],
  css: ['~/assets/css/main.css'],
  hub: {
    database: true
  },
  runtimeConfig: {
    oauth: {
      // provider in lowercase (github, google, etc.)
      github: {
        clientId: "",
        clientSecret: "",
      },
      google: {
        clientId: "",
        clientSecret: "",
      },
    },
  },
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