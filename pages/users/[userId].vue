<template>
  <div class="user-profile-page">
    <UserBoard />
  </div>
</template>

<script setup>
import UserBoard from "~/components/UserBoard.vue"; // Importer le composant UserBoard
import { useHead } from "#imports";

useHead({
  title: "Profil Utilisateur - Gosen'Eye",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});
</script>

<style scoped>
.user-profile-page {
  padding: 20px;
  background-color: #000; /* Fond noir */
  color: #f8c471; /* Texte doré */
}
</style>
