<template>
  <div class="homepage-container">
    <Documentation />
  </div>
</template>

<script setup>
import Documentation from "@/components/Documentation.vue";
import { useHead } from "#imports";

useHead({
  title: "Documentation | Système de Gestion de Vidéos",
  meta: [
    {
      name: "description",
      content:
        "Découvrez comment utiliser le système de gestion de vidéos, y compris la navigation pour les utilisateurs et les administrateurs, les fonctionnalités, et les meilleures pratiques.",
    },
    {
      name: "keywords",
      content:
        "documentation, vidéos, gestion, administration, utilisateurs, Nuxt, Vue, Pinia, tutoriel",
    },
    {
      property: "og:title",
      content: "Documentation - Système de Gestion de Vidéos",
    },
    {
      property: "og:description",
      content:
        "Découvrez comment utiliser le système de gestion de vidéos, y compris la navigation pour les utilisateurs et les administrateurs, les fonctionnalités, et les meilleures pratiques.",
    },
    { property: "og:image", content: "/images/signature.png" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Documentation - Système de Gestion de Vidéos",
    },
    {
      name: "twitter:description",
      content: "Découvrez comment utiliser le système de gestion de vidéos.",
    },
    { name: "twitter:image", content: "/images/signature.png" },
  ],
});
</script>

<style scoped>
@media (max-width: 600px) {
  .homepage-container {
    padding: 15px;
  }
}
</style>
