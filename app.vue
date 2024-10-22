<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useAuthStore } from "~/store/authStore";

const authStore = useAuthStore();
authStore.hydrateUserFromLocalStorage(); // Hydrater l'utilisateur dès le chargement
</script>
