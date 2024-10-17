// plugins/google-analytics.client.js
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const config = useRuntimeConfig();

    if (config.public.googleAnalyticsId) {
      // Charger le script Google Analytics
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.public.googleAnalyticsId}`;
      document.head.appendChild(script);

      // Ajouter la configuration Google Analytics
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", config.public.googleAnalyticsId);
      };
    } else {
      console.error("L'identifiant Google Analytics n'est pas défini.");
    }
  }
});
