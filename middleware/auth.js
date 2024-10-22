// middleware/auth.js
/*import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Hydrate l'utilisateur si les données sont présentes dans localStorage
  if (!authStore.isLoggedIn) {
    authStore.hydrateUserFromLocalStorage();
  }

  // Vérifie si l'utilisateur est connecté
  if (!authStore.isLoggedIn) {
    return navigateTo("/login"); // Redirige vers la page de connexion
  }

  // Vérifie si la page requiert un rôle administrateur
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return navigateTo("/"); // Redirige vers la page d'accueil si l'utilisateur n'est pas admin
  }

  // Si toutes les conditions sont remplies, on laisse passer
});
*/
import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Hydrater l'utilisateur à partir de localStorage si nécessaire
  if (!authStore.isLoggedIn) {
    authStore.hydrateUserFromLocalStorage();
  }

  // Attendre que l'hydratation soit terminée avant de vérifier l'état de connexion
  if (!authStore.isLoggedIn) {
    return navigateTo("/login"); // Redirige vers la page de connexion
  }

  // Vérifie si la page requiert un rôle administrateur
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return navigateTo("/"); // Redirige vers la page d'accueil si l'utilisateur n'est pas admin
  }
});
