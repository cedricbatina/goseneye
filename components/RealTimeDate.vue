<template>
  <div class="real-time-date">
    {{ currentDate }}
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Déclaration d'une référence réactive pour stocker la date actuelle
const currentDate = ref("");

// Fonction pour mettre à jour la date au format français
const updateDate = () => {
  const now = new Date();
  const options = {
    weekday: "long", // Jour de la semaine (ex: mardi)
    year: "numeric", // Année (ex: 2024)
    month: "long", // Mois (ex: octobre)
    day: "numeric", // Jour du mois (ex: 7)
    hour: "2-digit", // Heure (ex: 14)
    minute: "2-digit", // Minute (ex: 35)
    second: "2-digit", // Seconde (ex: 08)
    hour12: false, // Format 24 heures
  };
  currentDate.value = now.toLocaleString("fr-FR", options);
};

// Initialisation de l'horloge
let timer = null;

// Mise en place de l'intervalle à chaque seconde
onMounted(() => {
  updateDate(); // Mise à jour initiale
  timer = setInterval(updateDate, 1000);
});

// Nettoyage de l'intervalle lors du démontage du composant
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.real-time-date {
  font-size: 1.2rem; /* Taille de base de la police */
  color: #f8c471; /* Texte doré pour correspondre au thème global */
  background-color: #000; /* Fond noir */
  padding: 0.75rem 1.5rem; /* Padding pour l'espacement */
  border-radius: 0.5rem; /* Bords arrondis */
  text-align: center; /* Centrer le texte */
  border: 1px solid #f8c471; /* Bordure dorée subtile */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Ombre légère pour faire ressortir */
  margin: 1rem auto; /* Espacement autour et centrer */
  max-width: 300px; /* Limite la largeur pour ne pas étirer sur de grands écrans */
}

/* Responsive design pour petits écrans */
@media (max-width: 768px) {
  .real-time-date {
    font-size: 1rem; /* Réduire la taille de la police sur les petits écrans */
    padding: 0.5rem 1rem; /* Réduire le padding */
  }
}

@media (max-width: 480px) {
  .real-time-date {
    font-size: 0.9rem; /* Encore plus petit pour les très petits écrans */
  }
}
</style>
