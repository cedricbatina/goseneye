<template>
  <div class="admin-stats">
    <h1 class="m-5">Statistiques du Site</h1>

    <!-- Grille des statistiques -->
    <div class="stats-grid">
      <!-- Card pour les utilisateurs -->
      <div class="stat-card" @click="redirectTo('/admin/users')">
        <i class="fas fa-users stat-icon"></i>
        <h4>{{ totalUsers }}</h4>
        <p>Utilisateurs inscrits</p>
      </div>

      <!-- Card pour les vidéos -->
      <div class="stat-card" @click="redirectTo('/admin/video/manage-videos')">
        <i class="fas fa-video stat-icon"></i>
        <h4>{{ totalVideos }}</h4>
        <p>Vidéos disponibles</p>
      </div>

      <!-- Card pour les catégories -->
      <div class="stat-card" @click="redirectTo('/admin/categories')">
        <i class="fas fa-list stat-icon"></i>
        <h4>{{ totalCategories }}</h4>
        <p>Catégories de vidéos</p>
      </div>
    </div>
    <CategoryVideoButtons />
    <AdminButtons />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Variables pour stocker les statistiques
const totalUsers = ref(0);
const totalVideos = ref(0);
const totalCategories = ref(0);
const router = useRouter(); // Instancier le routeur

// Fonction pour récupérer les statistiques depuis l'API
const fetchStats = async () => {
  try {
    const response = await fetch("/api/get-stats");
    const data = await response.json();

    // Mettre à jour les statistiques
    totalUsers.value = data.totalUsers;
    totalVideos.value = data.totalVideos;
    totalCategories.value = data.totalCategories;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques", error);
  }
};

// Fonction pour rediriger l'utilisateur
const redirectTo = (path) => {
  router.push(path);
};

onMounted(() => {
  fetchStats(); // Récupérer les statistiques au chargement du composant
});
</script>

<style scoped>
.admin-stats {
  padding: 50px;
  text-align: center;
  background-color: #000; /* Fond noir */
  color: #f8c471; /* Texte doré */
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Réactif */
  gap: 30px;
  margin-top: 30px;
}

/* Styles des cartes de statistique */
.stat-card {
  background-color: #111; /* Fond noir profond */
  border: 2px solid #f8c471; /* Bordure dorée */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer; /* Indiquer que la carte est cliquable */
  text-align: center;
}

.stat-card:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
}

.stat-icon {
  font-size: 50px;
  color: #f8c471;
  margin-bottom: 15px;
}

h4 {
  color: #f8c471;
  font-size: 36px;
}

p {
  color: #f1f1f1;
  margin-top: 10px;
  font-size: 18px;
}

/* Responsive design pour les boutons */
@media (max-width: 768px) {
}

/* Responsive design pour la grille des cartes */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  h4 {
    font-size: 28px;
  }

  .stat-icon {
    font-size: 40px;
  }

  p {
    font-size: 16px;
  }
}
</style>
