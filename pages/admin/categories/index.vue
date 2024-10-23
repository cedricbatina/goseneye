<template>
  <div class="homepage-container">
    <ManageCategories />
    <h1 class="text-center text-white">
      Ci-dessous les catégories contenant des vidéos
    </h1>
    <VideoByCategory />
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authStore";
import { useHead } from "#imports";

// Appliquer le middleware à cette page
definePageMeta({
  middleware: "auth", // Utilisation du middleware "auth"
  requiresAdmin: true, // Cette page nécessite un accès administrateur
});

// Utilisation de `useHead` pour ajouter des balises SEO
useHead({
  title: "Gestion des catégories - Admin | Gosen'Eye",
  meta: [
    {
      name: "description",
      content:
        "Page d'administration pour gérer les catégories des vidéos. Réservée aux administrateurs de Gosen'Eye.",
    },
    {
      property: "og:title",
      content: "Gestion des catégories - Admin | Gosen'Eye",
    },
    {
      property: "og:description",
      content:
        "Accédez à la page d'administration pour gérer les catégories des vidéos sur Gosen'Eye.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.goseneye.com/admin/categories",
    },
    {
      property: "og:image",
      content: "https://www.goseneye.com/public/images/signature.png",
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
    },
  ],
});

// Hydrater l'utilisateur depuis le store
const authStore = useAuthStore();
authStore.hydrateUserFromLocalStorage();
</script>

<style scoped>
.homepage-container {
  padding: 20px;
}
h1 {
  font-size: 16px;
}
/* Responsive adjustments */
@media (max-width: 768px) {
  .homepage-container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .homepage-container {
    padding: 10px;
  }
  h1 {
    font-size: 14px;
  }
}
</style>
