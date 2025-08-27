/**
 * Nuxt configuration for Notes Frontend
 * - Global CSS
 * - Dev server config
 * - App metadata
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/styles.css"],
  app: {
    head: {
      title: "Notes",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#ffffff" },
        { name: "description", content: "Minimal notes app" }
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" }
      ]
    }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
