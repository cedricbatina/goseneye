import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token, // Changer la logique : vérifier si un token est présent
    isAdmin: (state) => state.user?.role_id === 1, // Vérifie si l'utilisateur est admin
  },
  actions: {
    async login(credentials) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();

        // Vérifier si la réponse est ok ou si une erreur est survenue
        if (!res.ok || !data.token) {
          throw new Error(data.error || "Erreur lors de la connexion");
        }

        // Si tout est correct, stocker les informations
        this.token = data.token;
        this.user = data.user;

        // Stocker dans localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Assurer une hydratation à jour après connexion
        this.hydrateUserFromLocalStorage();
      } catch (error) {
        console.error("Erreur lors de la connexion:", error.message);
        throw new Error(error.message);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    hydrateUserFromLocalStorage() {
      if (import.meta.env.SSR === false) {
        // Exécuter uniquement côté client
        const token = localStorage.getItem("token");
        if (token) {
          this.token = token;
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            this.user = user;
          }
        }
      }
    },
  },
});

/*import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token, // Changer la logique : vérifier si un token est présent
    isAdmin: (state) => state.user?.role_id === 1, // Vérifie si l'utilisateur est admin
  },
  actions: {
    async login(credentials) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();

        // Vérifier si la réponse est ok ou si une erreur est survenue
        if (!res.ok || !data.token) {
          throw new Error(data.error || "Erreur lors de la connexion");
        }

        // Si tout est correct, stocker les informations
        this.token = data.token;
        this.user = data.user;

        // Stocker dans localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Assurer une hydratation à jour après connexion
        this.hydrateUserFromLocalStorage();
      } catch (error) {
        console.error("Erreur lors de la connexion:", error.message);
        throw new Error(error.message);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    hydrateUserFromLocalStorage() {
      if (import.meta.env.SSR === false) {
        // Exécuter uniquement côté client
        const token = localStorage.getItem("token");
        if (token) {
          this.token = token;
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            this.user = user;
          }
        }
      }
    },
  },
});
*/
/*
import { defineStore } from "pinia";
import { useCookie } from "#app"; // Utiliser cookies

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role_id === 1,
  },
  actions: {
    async login(credentials) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();
        if (res.ok && data.token) {
          // Enregistrer les données dans l'état du store
          this.token = data.token;
          this.user = data.user;

          // Stocker dans localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Stocker dans les cookies uniquement pour la redondance
          const userCookie = useCookie("auth_user");
          userCookie.value = JSON.stringify(data.user);
        } else {
          throw new Error(data.error || "Erreur lors de la connexion");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    logout() {
      // Réinitialiser l'état du store
      this.user = null;
      this.token = null;

      // Supprimer de localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Supprimer des cookies
      const userCookie = useCookie("auth_user");
      userCookie.value = null;
    },

    hydrateUserFromLocalStorage() {
      // Récupérer l'utilisateur et le token du localStorage
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },
  },
});*/
