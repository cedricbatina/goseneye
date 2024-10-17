// plugins/auth.js
import { useAuthStore } from "~/store/authStore";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  if (import.meta.client) {
    // Hydrater l'utilisateur uniquement côté client
    authStore.hydrateUserFromLocalStorage();
  }
});
