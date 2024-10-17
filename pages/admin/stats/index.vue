<template>
  <div>
    <AdminStats />
  </div>
</template>

<script setup>
// Appliquer le middleware à cette page
definePageMeta({
  middleware: "auth", // Utilisation du middleware "auth"
  requiresAdmin: true, // Cette page nécessite un accès administrateur
});
</script>