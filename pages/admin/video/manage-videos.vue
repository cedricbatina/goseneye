<template>
  <div class="homepage-container">
    <h1 class="mb-5">Gestion des Vidéos</h1>

    <SearchVideoForm />

    <!-- Boutons de navigation -->
    <div class="button-group mb-5">
      <nuxt-link to="/admin/video/create-video" class="btn btn-nav">
        <i class="fas fa-video"></i> Créer une vidéo
      </nuxt-link>
      <nuxt-link to="/admin/categories" class="btn btn-nav">
        <i class="fas fa-film"></i> Gérer les catégories
      </nuxt-link>
      <nuxt-link to="/admin/users" class="btn btn-nav">
        <i class="fas fa-users"></i> Gérer les utilisateurs
      </nuxt-link>
      <nuxt-link to="/admin" class="btn btn-nav">
        <i class="fas fa-home"></i> Retour à Admin Board
      </nuxt-link>
    </div>
    <!-- Section pour les dernières vidéos paginées -->
    <div class="latest-videos-section m-4">
      <h4 class="m-2">Toutes les vidéos</h4>
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

    <ManageVideos />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useHead } from "#imports";
import Pagination from "~/components/Pagination.vue";
import VideoGrid from "~/components/VideoGrid.vue"; // Import du composant VideoGrid

import SearchVideoForm from "~/components/SearchVideoForm.vue";
// Appliquer le middleware à cette page
definePageMeta({
  middleware: "auth", // Utilisation du middleware "auth"
  requiresAdmin: true, // Cette page nécessite un accès administrateur
});

// Utiliser useHead pour définir le titre et les balises meta
useHead(() => {
  const title = "Vidéos - Gosen'Eye | Découvrez nos dernières réalisations";
  const description =
    "Parcourez toutes les vidéos postées par Gosen'Eye. Découvrez nos dernières productions et plongez-vous dans l'univers de la vidéo créative.";

  return {
    title,
    meta: [
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "vidéaste, vidéos, productions, Gosen'Eye, créativité, réalisations, vidéo professionnelle",
      },
      // Balises Open Graph pour le partage sur les réseaux sociaux
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.goseneye.com/videos" },
      {
        property: "og:image",
        content: "https://www.goseneye.com/public/images/signature.png",
      },
      // Balises Twitter Card
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://www.goseneye.com/public/images/signature.png",
      },
    ],
  };
});

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
.homepage-container {
  padding: 50px;
  text-align: center;
  background-color: #000;
  color: #f8c471;
}

/* Responsiveness pour l'ensemble de la page */
@media (max-width: 768px) {
  .homepage-container {
    padding: 20px;
  }
}

/* Pour les composants de la page */

.search-video-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.search-video-form input,
.search-video-form button {
  width: 100%;
  margin-bottom: 10px;
}

.video-by-category {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.video-by-category .video-item {
  background-color: #111;
  padding: 20px;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.video-by-category .video-item:hover {
  transform: scale(1.05);
}

/* ManageVideos section */
.manage-videos {
  padding: 50px;
  text-align: center;
}

.manage-videos table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.manage-videos th,
.manage-videos td {
  padding: 15px;
  border: 1px solid #f8c471;
}

.manage-videos th {
  background-color: #000;
  color: #f8c471;
}

.manage-videos td {
  background-color: #333;
}

/* Style des boutons */
.manage-videos .btn {
  background-color: #000;
  color: #f8c471;
  padding: 10px 15px;
  text-decoration: none;
  border: 1px solid #f8c471;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  background-color: #000;
  color: #f8c471;
  padding: 10px 20px;
  border: 1px solid #f8c471;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #f8c471;
  color: #000;
}

.btn i {
  margin-right: 8px;
}
.manage-videos .btn:hover {
  background-color: #f8c471;
  color: #000;
}

/* Media Queries pour rendre la page entièrement responsive */
@media (max-width: 768px) {
  .video-by-category {
    grid-template-columns: 1fr;
    padding: 10px;
  }

  .search-video-form input,
  .search-video-form button {
    width: 100%;
  }

  .manage-videos th,
  .manage-videos td {
    white-space: nowrap; /* Empêcher la coupure du texte */
    padding: 10px;
    font-size: 14px;
  }

  .manage-videos .btn {
    padding: 8px 12px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .manage-videos th,
  .manage-videos td {
    font-size: 12px;
    padding: 8px;
  }

  .manage-videos .btn {
    padding: 6px 10px;
    font-size: 12px;
  }
}
</style>