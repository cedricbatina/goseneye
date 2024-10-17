<template>
  <div class="search-video-form">
    <h4 class="search-title">Rechercher une vidéo</h4>
    <div class="search-input-wrapper">
      <input
        v-model="query"
        type="text"
        placeholder="Rechercher une vidéo par titre.."
        class="search-input"
      />
      <!-- Icône de loupe -->
      <i class="fas fa-search search-icon"></i>
    </div>

    <!-- Résultats de la recherche -->
    <div v-if="loading" class="loading-message">
      <p>Recherche en cours...</p>
    </div>

    <div v-else-if="videos.length > 0" class="search-results">
      <h4>Résultats de la recherche</h4>
      <ul>
        <li v-for="video in videos" :key="video.slug">
          <!-- Utiliser video.slug pour générer le lien correct -->
          <nuxt-link :to="`/video/${video.slug}`">
            <i class="fas fa-play-circle"></i> {{ video.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <div v-else-if="query.length > 0 && !loading && videos.length === 0">
      <p>
        <i class="fas fa-exclamation-circle"></i> Aucun résultat trouvé pour "{{
          query
        }}"
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from "vue";

// Variables réactives pour stocker les résultats de la recherche et la requête
const query = ref(""); // Stocker la requête de recherche
const videos = ref([]); // Stocker les résultats de la recherche
const loading = ref(false); // Indicateur de chargement

// Fonction pour effectuer la recherche
const searchVideos = async () => {
  if (query.value.length === 0) {
    videos.value = [];
    return;
  }

  loading.value = true; // Activer l'indicateur de chargement
  videos.value = []; // Réinitialiser les résultats précédents

  try {
    const res = await fetch(`/api/search-videos?query=${query.value}`);
    const data = await res.json();

    if (res.ok && data.videos) {
      videos.value = data.videos; // Assigner les vidéos récupérées
    } else {
      videos.value = [];
    }
  } catch (error) {
    console.error("Erreur lors de la recherche des vidéos", error);
  } finally {
    loading.value = false; // Désactiver l'indicateur de chargement
  }
};

// Watcher pour déclencher la recherche dès que la valeur de query change
watch(query, (newQuery) => {
  searchVideos(); // Lancer la recherche à chaque changement de la saisie
});
</script>

<style scoped>
.search-video-form {
  margin: 30px auto;
  text-align: center;
  max-width: 600px;
  background-color: #000; /* Fond noir */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Ajoute un effet d'ombre */
}

.search-title {
  font-size: 24px;
  margin-bottom: 20px; /* Assure un espace suffisant entre le titre et l'input */
  color: #f8c471;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

/* Style pour l'input de recherche */
.search-input {
  width: 100%;
  padding: 12px;
  padding-right: 40px; /* Espace pour l'icône */
  border: 2px solid #f8c471;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px; /* Espace sous l'input */
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
}

/* Résultats de la recherche */
.search-results {
  margin-top: 20px;
}

.search-results ul {
  list-style: none;
  padding: 0;
}

.search-results li {
  background-color: #333;
  color: #f8c471;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.search-results li:hover {
  background-color: #444;
}

.search-results i {
  margin-right: 10px;
}

.search-results a {
  color: #f8c471;
  text-decoration: none;
}

.search-results a:hover {
  text-decoration: underline;
}

.loading-message {
  margin-top: 20px;
  color: #f8c471;
}

@media (max-width: 768px) {
  .search-video-form {
    max-width: 100%;
    padding: 15px;
  }

  .search-title {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .search-input {
    padding: 10px;
    font-size: 14px;
  }

  .search-title {
    font-size: 18px;
  }

  .search-icon {
    right: 10px;
  }
}
</style>
