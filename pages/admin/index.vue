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
});
definePageMeta({
  middleware: "auth", // Utilise le middleware auth
  requiresAdmin: true, // Seuls les administrateurs peuvent accéder à cette page
});
</script>
