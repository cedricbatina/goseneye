<template>
  <div class="homepage-container">
    <!-- Login form -->
    <Login />

    <!-- Category & Video Buttons -->
    <CategoryVideoButtons />
  </div>
</template>

<script setup>
import { useHead } from "#imports";

// SEO et balises de la page
useHead({
  title: "Accueil & Connexion - Goseneye",
  meta: [
    {
      name: "description",
      content:
        "Bienvenue sur Goseneye, connectez-vous pour accéder à votre compte ou explorez nos vidéos et catégories.",
    },
    {
      name: "keywords",
      content: "Goseneye, connexion, vidéos, catégories, production vidéo",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://goseneye.com", // Lien canonique vers la page d'accueil
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Goseneye - Connexion et Vidéos",
        description:
          "Connectez-vous à Goseneye pour gérer vos vidéos ou explorez nos catégories et productions vidéo.",
        url: "https://goseneye.com",
      }),
    },
  ],
});
</script>

<style scoped>
/*.homepage-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #000; 
  color: #f8c471;
  min-height: 100vh;
}*/

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
}
</style>
