<template>
  <div v-if="isAdmin">
    <!-- Boutons de navigation -->
    <div class="button-group mt-5 mb-5">
      <nuxt-link to="/admin/video/create-video" class="btn-admin">
        <i class="fas fa-video"></i> Créer une vidéo
      </nuxt-link>
      <nuxt-link to="/admin/video/manage-videos" class="btn-admin">
        <i class="fas fa-video"></i> Gérer les vidéos
      </nuxt-link>
      <nuxt-link to="/admin/categories" class="btn-admin">
        <i class="fas fa-list"></i> Gérer les catégories
      </nuxt-link>
      <nuxt-link to="/admin/users" class="btn-admin">
        <i class="fas fa-users"></i> Gérer les utilisateurs
      </nuxt-link>
      <nuxt-link to="/admin" class="btn-admin">
        <i class="fas fa-home"></i> Retour à Admin Board
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authStore"; // Importer authStore

const authStore = useAuthStore(); // Accéder au store
const isAdmin = authStore.isAdmin; // Vérifier si l'utilisateur est admin
</script>

<style scoped>
/* Style des boutons */
/* Centrer les boutons */
.button-group {
  display: flex;
  flex-wrap: wrap; /* Permet d'aller à la ligne sur petits écrans */
  justify-content: center; /* Centre les boutons horizontalement */
  gap: 10px; /* Espace entre les boutons */
  margin-bottom: 20px;
}

/* Style des boutons */
.btn-admin {
  background-color: #000;
  margin: 4px;
  color: #f8c471;
  padding: 12px 20px;
  border: 2px solid #f8c471;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-admin i {
  margin-right: 8px;
}

.btn-admin:hover {
  background-color: #f8c471;
  color: #000;
}

/* Réactivité pour les petits écrans */
@media (max-width: 768px) {
  .button-group {
    flex-direction: column; /* Les boutons se mettent en colonne sur petits écrans */
    align-items: center; /* Centrer les boutons en colonne */
  }

  .btn-admin {
    padding: 10px 15px;
    font-size: 14px;
    width: 100%; /* Les boutons prennent toute la largeur sur petits écrans */
    max-width: 300px; /* Limiter la largeur maximale */
  }
}

@media (max-width: 480px) {
  .btn-admin {
    padding: 8px 12px;
    font-size: 12px;
  }

  .btn-admin i {
    margin-right: 5px;
  }
}
</style>
