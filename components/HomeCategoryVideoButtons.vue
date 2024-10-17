<template>
  <div class="button-container mt-5 mb-5">
    <!-- Bouton vers la page des catégories -->
    <nuxt-link
      to="/categories"
      class="btn-responsive"
      aria-label="Voir les catégories"
    >
      <i class="fas fa-list"></i> Catégories
    </nuxt-link>

    <!-- Bouton vers la page des vidéos -->
    <nuxt-link to="/videos" class="btn-responsive" aria-label="Voir les vidéos">
      <i class="fas fa-video"></i> Vidéos
    </nuxt-link>
  </div>
</template>

<script setup>
// Pas besoin de script pour ce composant
</script>

<style scoped>
/* Container pour les boutons */
.button-container {
  display: flex;
  justify-content: center; /* Centrer les boutons */
  gap: 20px; /* Espacement entre les boutons */
  margin: 20px 0; /* Espace autour du container */
}

/* Style des boutons */
.btn-responsive {
  background-color: #000; /* Fond noir */
  color: #f8c471; /* Texte doré */
  padding: 15px 25px;
  border: 2px solid #f8c471;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center; /* Centrer le contenu des boutons */
  gap: 10px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s;
}

/* Effet au survol des boutons */
.btn-responsive:hover {
  background-color: #f8c471; /* Teinte dorée au survol */
  color: #000; /* Texte noir au survol */
  transform: scale(1.05); /* Légère mise en avant */
}

/* Icônes des boutons */
.btn-responsive i {
  font-size: 24px;
}

/* Réactivité pour les petits écrans */
@media (max-width: 768px) {
  .button-container {
    flex-direction: column; /* Empile les boutons en colonne sur petits écrans */
    align-items: center; /* Centrer les boutons en colonne */
  }

  .btn-responsive {
    font-size: 16px;
    padding: 10px 20px;
    width: 100%; /* Les boutons prennent toute la largeur disponible */
    max-width: 300px; /* Limiter la largeur maximale */
  }
}

/* Réactivité pour les très petits écrans */
@media (max-width: 480px) {
  .btn-responsive {
    font-size: 14px;
    padding: 8px 15px;
  }

  .btn-responsive i {
    font-size: 20px;
  }
}
</style>
