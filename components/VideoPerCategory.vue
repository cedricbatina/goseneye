
<template>
  <div class="category-section">
    <h2>Vidéos par catégorie</h2>

    <!-- Affichage des vidéos pour la catégorie sélectionnée -->
    <div v-if="videos && videos.length > 0">
      <h3>Vidéos pour la catégorie sélectionnée</h3>
      <div class="video-grid">
        <div v-for="video in videos" :key="video.id" class="video-item">
          <img :src="video.thumbnail_url" alt="Miniature de la vidéo" />
          <h4>{{ video.title }}</h4>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Aucune vidéo disponible pour cette catégorie.</p>
    </div>

    <!-- Affichage des erreurs -->
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Variables réactives
const videos = ref([]); // Initialise avec un tableau vide
const error = ref(null);

// Fonction pour récupérer les vidéos par catégorie
const fetchVideosByCategory = async (categoryId) => {
  try {
    console.log(`Récupération des vidéos pour la catégorie : ${categoryId}`);

    // Appel API pour récupérer les vidéos
    const res = await fetch(`/api/get-videos-by-category/${categoryId}`);
    const data = await res.json();

    // Vérifier les vidéos récupérées
    console.log("Vidéos récupérées :", data);

    if (res.ok && data.videos) {
      videos.value = data.videos; // Assigner les vidéos récupérées
      console.log("Vidéos assignées à videos.value :", videos.value);
    } else {
      throw new Error(
        data.error || "Erreur lors de la récupération des vidéos"
      );
    }
  } catch (err) {
    console.error("Erreur dans fetchVideosByCategory:", err.message);
    error.value = err.message;
  }
};

// Appel de la fonction pour récupérer les vidéos lors du montage du composant
onMounted(() => {
  fetchVideosByCategory(1); // Remplace 1 par l'ID dynamique de la catégorie si nécessaire
});
</script>


<style scoped>
.category-section {
  margin: 20px;
}

.category-item h3 {
  cursor: pointer;
  color: #f8c471;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Grid de 3 colonnes */
  gap: 20px;
}

.video-item {
  background-color: #000; /* Fond noir */
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #f8c471; /* Bordure dorée */
  text-align: center;
  transition: transform 0.3s;
}
</style>
