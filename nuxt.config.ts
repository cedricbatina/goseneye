// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // ou false si vous voulez un rendu uniquement côté client (SPA)
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },


  // Ajout des plugins nécessaires
  plugins: [
    { src: '~/plugins/vue-carousel-client.js', mode: 'client' },
    '~/plugins/cookies.js',  // Assurer que Pinia est correctement initialisé
    '~/plugins/auth.js',      // Ton plugin d'authentification
    '~/plugins/google-analytics.client.js' // Plugin Google Analytics
  ],


  css: [
    '~/assets/css/main.css',
    // '~/assets/css/home-page-style.css',
    //'~/assets/css/footer-style.css',
    'bootstrap/dist/css/bootstrap.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],
  build: {
    transpile: [],
  },
  modules: ['vue3-carousel-nuxt', '@nuxtjs/sitemap', '@pinia/nuxt'],
  sitemap: {
    // Configuration du sitemap
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  vite: {
    css: {
      preprocessorOptions: {
        // vous pouvez ajouter des configurations spécifiques ici pour les préprocesseurs comme SCSS
      },
    },
  },
  runtimeConfig: {
    public: {
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '', // Identifiant Google Analytics depuis le .env
    },
    // NUXT_HOST: '0.0.0.0',  // Utiliser deux-points ici
    // NUXT_PORT: 4000,       // Utiliser deux-points ici
    // Variables privées (côté serveur seulement)
    dbHost: process.env.DB_HOST || 'localhost', // Valeur par défaut pour le développement
    dbUser: process.env.DB_USER || 'cedricbatina',
    dbPassword: process.env.DB_PASSWORD || 'Elijahbatina2008',
    dbName: process.env.DB_NAME || 'goseneye',

    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    emailFrom: process.env.EMAIL_FROM,
    baseUrl: process.env.BASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
  }

})