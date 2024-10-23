<template>
  <div>
    <!-- Section vidéo -->
    <div class="video-section m-5" v-if="videoSrc && !isLoading">
      <div class="video-wrapper">
        <iframe
          id="youtube-player"
          class="video-iframe"
          :src="videoSrc"
          frameborder="0"
          loading="lazy"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- Section d'erreur si la récupération de la vidéo échoue -->
    <div v-if="errorMessage" class="error-section">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Section "aucune vidéo disponible" -->
    <div v-else-if="!videoSrc && !isLoading" class="no-video">
      <p>Aucune vidéo disponible pour le moment.</p>
    </div>

    <!-- Description de la vidéo -->
    <div class="description-section" v-if="video && !isLoading">
      <p class="video-excerpt">{{ truncatedDescription }}</p>
      <button @click="toggleDescription" class="toggle-button">
        <div
          class="button-content"
          :class="{ expanded: isDescriptionExpanded }"
        >
          <span>{{ isDescriptionExpanded ? "Voir moins" : "Voir plus" }}</span>
          <i
            :class="
              isDescriptionExpanded
                ? 'fas fa-chevron-up'
                : 'fas fa-chevron-down'
            "
          ></i>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useAsyncData } from "#imports";

// Variables pour l'état de la description
const isDescriptionExpanded = ref(false);
const isLoading = ref(true); // Ajout de l'état de chargement
const errorMessage = ref(null); // Message d'erreur pour la gestion des erreurs

// Fonction pour extraire l'ID de la vidéo YouTube
const getYoutubeVideoId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?\/)|.*[?&]v=)|youtu\.be\/)([^\s&?]+)/;
  const match = url.match(regex);
  return match && match[1] ? match[1] : "";
};

// Utilisation de useAsyncData pour récupérer la vidéo
const { data: videoData, error } = useAsyncData("latestVideo", () =>
  $fetch("/api/get-latest-video")
);

// Vérifier les erreurs
if (error.value) {
  console.error("Erreur lors de la récupération de la vidéo:", error.value);
  errorMessage.value = "Erreur lors de la récupération de la vidéo.";
  isLoading.value = false;
}

// Déclarer 'video' comme ref réactive
const video = ref(null);

// Mettre à jour 'video' lorsque 'videoData' change
watchEffect(() => {
  if (videoData.value?.video) {
    video.value = videoData.value.video;
    isLoading.value = false;
  } else {
    isLoading.value = false;
    errorMessage.value = "Aucune vidéo trouvée.";
  }
});

// Computed property pour la description tronquée
const truncatedDescription = computed(() => {
  if (!video.value || !video.value.description) return "";
  if (video.value.description.length <= 200 || isDescriptionExpanded.value) {
    return video.value.description;
  } else {
    return video.value.description.substring(0, 200) + "...";
  }
});

// Fonction pour basculer la description
const toggleDescription = () => {
  isDescriptionExpanded.value = !isDescriptionExpanded.value;
};

// Générer l'URL de la vidéo YouTube
const videoSrc = computed(() => {
  if (!video.value || !video.value.youtube_url) return "";
  const videoId = getYoutubeVideoId(video.value.youtube_url);
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=1`;
});
</script>

<style scoped>
.video-section {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* Ratio d'aspect 16:9 */
  overflow: hidden; /* Empêche le débordement de la vidéo */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%; /* Empêche la vidéo de déborder */
  box-sizing: border-box; /* Inclut les bordures et marges dans la largeur */
}

.youtube-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  border: none;
  object-fit: cover; /* S'assure que la vidéo couvre bien toute la surface sans déborder */
}
.video-iframe {
  width: 100%;
  height: 500px;
  border: none;
}

.description-section {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
}

.video-excerpt {
  font-size: 16px;
  color: #f1f1f1;
}

.toggle-button {
  background-color: transparent;
  border: none;
  color: #f8c471;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  margin-top: 10px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: flex-direction 0.3s ease;
}

.button-content.expanded {
  flex-direction: column-reverse;
}

.button-content span {
  font-size: 16px;
}

.button-content i {
  font-size: 16px;
  margin-top: 5px;
  transition: transform 0.3s ease;
}

.no-video {
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
}
/* Ajoute ce style global ou directement dans LatestVideo.vue */
.video-iframe {
  width: 100%; /* S'assure que l'iframe prend toute la largeur du conteneur */
  max-width: 100%;
  height: auto; /* Ajuste la hauteur automatiquement */
  aspect-ratio: 16 / 9; /* Maintient un rapport 16:9 pour les vidéos YouTube */
  border: none; /* Retire la bordure */
  display: block;
}

.video-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* Centre la vidéo */
  overflow: hidden; /* Empêche tout débordement */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .video-section {
    padding-bottom: 56.25%; /* Ratio 16:9 pour petits écrans */
  }
  .youtube-video {
    width: 100%;
    height: 100%;
  }
  .video-iframe {
    height: auto; /* Permet à l'iframe de redimensionner en fonction de la largeur disponible */
    aspect-ratio: 16 / 9; /* Maintient le rapport d'aspect */
  }
  .video-excerpt {
    font-size: 14px; /* Réduction de la taille de la police pour les petits écrans */
  }

  .toggle-button {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .video-section {
    padding-bottom: 56.25%; /* Ratio 16:9 */
  }

  .youtube-video {
    width: 100%;
    height: 100%;
  }

  .video-excerpt {
    font-size: 12px;
  }

  .toggle-button {
    font-size: 12px;
  }
}
</style>
