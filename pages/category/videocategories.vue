<template>
  <div class="homepage-container">
    <!-- Section pour les dernières vidéos paginées -->
    <div class="latest-videos-section">
      <h1>Toutes les vidéos</h1>
      <div v-if="loading">Chargement des vidéos...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <!-- Utilisation du composant VideoGrid -->
        <VideoGrid :videos="paginatedVideos" />

        <!-- Pagination component -->
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @updatePage="currentPage = $event"
        />
      </div>
    </div>
    <VideoByCategory />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
//import Pagination from "~/components/Pagination.vue";
//import VideoGrid from "~/components/VideoGrid.vue"; // Import du composant VideoGrid

// Gestion des vidéos paginées
const videos = ref([]);
const currentPage = ref(1);
const videosPerPage = 6;
const loading = ref(true);
const error = ref(null);

const paginatedVideos = computed(() => {
  const start = (currentPage.value - 1) * videosPerPage;
  const end = start + videosPerPage;
  return videos.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(videos.value.length / videosPerPage)
);

const fetchVideos = async () => {
  try {
    // Utilisation de $fetch pour les requêtes après le montage
    const data = await $fetch("/api/get-videos");

    // Vérifier les données récupérées
    if (data && data.videos) {
      videos.value = data.videos;
      console.log("Vidéos récupérées : ", videos.value.length); // Vérifie le nombre de vidéos récupérées
    } else {
      throw new Error("Aucune vidéo trouvée");
    }
  } catch (err) {
    error.value = err.message || "Erreur lors de la récupération des vidéos";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
/* Design noir et or élégant */
.home-page {
  background-color: #000; /* Noir pur */
  color: #f8c471; /* Or */
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 40px;
}

h1 {
  color: #f8c471;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 20px;
}

/* Section pour le paragraphe d'introduction */
.intro-section {
  margin: 20px auto;
  max-width: 800px;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  color: #f1f1f1;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Pagination styles */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination button {
  background-color: #f8c471;
  color: #000;
  border: none;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:hover {
  background-color: #cda85b;
}
.closing-section {
  background-color: rgba(0, 0, 0, 0.85); /* Fond noir avec transparence */
  color: #f8c471; /* Texte doré */
  padding: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  max-width: 800px;
  margin: 40px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.closing-section {
  background-color: rgba(0, 0, 0, 0.75); /* Fond noir encore plus transparent */
  color: #f8c471; /* Texte doré */
  padding: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  max-width: 800px;
  margin: 40px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre plus douce */
}

.closing-section p {
  margin-bottom: 20px;
  color: #f1f1f1; /* Texte blanc cassé pour améliorer la lisibilité */
}

.closing-section strong {
  color: #ffd700; /* Doré plus éclatant */
}

.cta {
  margin-top: 30px;
}

.contact-button {
  display: inline-block;
  padding: 12px 20px;
  background-color: #f8c471;
  color: #000;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
}

.contact-button:hover {
  background-color: #cda85b;
}
</style>
