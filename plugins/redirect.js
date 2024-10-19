export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const currentUrl = window.location.href;

    // Vérifier l'URL complète ou le chemin
    if (
      currentUrl.endsWith("/index.html") ||
      window.location.pathname === "/index.html"
    ) {
      window.location.href = "/";
    }
  }
});
