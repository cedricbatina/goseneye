<template>
  <div class="homepage-container">
    <AdminBoard />
  </div>
</template>
<script setup>
import { useHead } from "#imports";

useHead({
  title: "Tableau de Bord Admin - Gosen'Eye",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
    },
  ],
});
definePageMeta({
  middleware: "auth", // Utilise le middleware auth
  requiresAdmin: true, // Seuls les administrateurs peuvent accéder à cette page
});
</script>
