<template>
  <div class="video-details-page">
    <div v-if="video" class="video-section">
      <!-- Lancer la vidéo dans un iframe avec la boucle activée -->
      <iframe
        v-if="youtubeVideoID"
        :src="`https://www.youtube.com/embed/${youtubeVideoID}?autoplay=1&controls=1&loop=1&playlist=${youtubeVideoID}`"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class="video-iframe"
        aria-label="Vidéo YouTube"
      ></iframe>

      <!-- Affichage d'un message si l'URL est incorrecte ou en cas d'erreur API -->
      <div v-else>
        <p>Erreur : Vidéo non disponible ou URL incorrecte.</p>
      </div>

      <!-- Description de la vidéo en dessous -->
      <div class="video-description">
        <h1>{{ video.title }}</h1>

        <!-- Description de la vidéo sous la vidéo -->
        <div class="description-section">
          <p class="video-excerpt">{{ truncatedDescription }}</p>
          <button @click="toggleDescription" class="toggle-button">
            <div
              class="button-content"
              :class="{ expanded: isDescriptionExpanded }"
            >
              <span>{{
                isDescriptionExpanded ? "Voir moins" : "Voir plus"
              }}</span>
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

        <!-- Boutons d'administration visibles uniquement pour les admins -->
        <AdminButtons />
      </div>
    </div>

    <div v-else>
      <p>Chargement de la vidéo...</p>
    </div>

    <VideoByCategory />

    <!-- Section pour les dernières vidéos paginées -->
    <div class="latest-videos-section mt-4">
      <h1>Toutes les vidéos</h1>
      <div v-if="loading">Chargement des vidéos...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <VideoGrid :videos="paginatedVideos" />
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @updatePage="currentPage = $event"
        />
      </div>
    </div>
    <CategoryVideoButtons />
    <AdminButtons />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "~/store/authStore";
import VideoGrid from "~/components/VideoGrid.vue";
import Pagination from "~/components/Pagination.vue";
import { useHead } from "#imports";

// Variables réactives pour stocker les données de la vidéo
const video = ref(null);
const youtubeVideoID = ref(null);
const route = useRoute();

// Récupérer l'authStore pour vérifier le rôle de l'utilisateur
const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user && authStore.user.role_id === 1);

// Gestion des vidéos paginées
const videos = ref([]);
const currentPage = ref(1);
const videosPerPage = 6;
const loading = ref(true);
const error = ref(null);

// Calculer les vidéos pour la page en cours
const paginatedVideos = computed(() => {
  const start = (currentPage.value - 1) * videosPerPage;
  const end = start + videosPerPage;
  return videos.value.slice(start, end);
});

// Calculer le nombre total de pages
const totalPages = computed(() =>
  Math.ceil(videos.value.length / videosPerPage)
);

// Fonction pour récupérer toutes les vidéos
const fetchVideos = async () => {
  try {
    console.log("Fetching all videos...");
    const data = await $fetch("/api/get-videos");

    if (data && data.videos) {
      videos.value = data.videos;
      console.log("Videos fetched:", videos.value);
    } else {
      throw new Error("Aucune vidéo trouvée");
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des vidéos:", err.message);
    error.value = err.message || "Erreur lors de la récupération des vidéos";
  } finally {
    loading.value = false;
  }
};

// Variables pour l'état de la description
const isDescriptionExpanded = ref(false);
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

// Fonction pour extraire l'ID de la vidéo YouTube depuis l'URL
function extractYouTubeID(url) {
  console.log("Extracting YouTube ID from URL:", url);
  if (typeof url !== "string") {
    console.error("URL invalide :", url);
    return null;
  }
  const regExp =
    /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  console.log("YouTube ID extrait :", videoId);
  return videoId;
}

// Fonction pour récupérer les détails de la vidéo
const fetchVideoDetails = async (slug) => {
  try {
    console.log("Fetching video details for slug:", slug);

    const baseURL = window.location.origin;
    const url = `${baseURL}/api/get-video-by-slug/${encodeURIComponent(slug)}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log("API appelée avec le slug :", slug);
    console.log("Données reçues de l'API :", data);

    if (res.ok && data.video) {
      video.value = data.video;

      console.log("Vidéo trouvée :", video.value);

      if (
        !video.value.youtube_url ||
        typeof video.value.youtube_url !== "string"
      ) {
        console.error(
          "URL de la vidéo non valide ou non définie :",
          video.value.youtube_url
        );
        throw new Error("URL de la vidéo non valide ou non définie.");
      }

      youtubeVideoID.value = extractYouTubeID(video.value.youtube_url);
      console.log("YouTube Video ID extrait :", youtubeVideoID.value);
    } else {
      console.error("Erreur : Vidéo non trouvée ou autre erreur :", data.error);
      throw new Error(data.error || "Vidéo non trouvée");
    }
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des détails de la vidéo :",
      err
    );
    error.value =
      err.message || "Erreur lors de la récupération des détails de la vidéo";
  }
};

// Appeler les fonctions au montage
onMounted(() => {
  const slug = route.params.slug;

  fetchVideoDetails(slug);
  fetchVideos();
});

// Ajouter le schema VideoObject pour SEO
useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: video.value?.title,
        description: video.value?.description,
        thumbnailUrl: video.value?.thumbnail_url,
        uploadDate: video.value?.created_at,
        duration: video.value?.duration
          ? `PT${Math.floor(video.value.duration.split(":")[0])}M${
              video.value.duration.split(":")[1]
            }S`
          : null,
        contentUrl: video.value?.youtube_url,
        embedUrl: `https://www.youtube.com/embed/${youtubeVideoID.value}`,
        publisher: {
          "@type": "Organization",
          name: "Gosen'Eye",
          logo: {
            "@type": "ImageObject",
            url: "/images/Goseneye-dore.png",
          },
        },
      }),
    },
  ],
});
</script>



<style scoped>
.duration {
  font-size: 10px;
  color: #f8c471;

  bottom: 10px;
  right: 10px;
}
.video-details-page {
  padding: 20px;
  background-color: #000;
  color: #f8c471;
}

h1 {
  color: #f8c471;
  text-align: center;
  font-size: 24px;
}

.video-section {
  text-align: center;
}

.video-iframe {
  width: 100%;
  height: 500px;
  border: none;
  margin-bottom: 20px;
}

.video-description {
  background-color: #000;
  color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.video-description h1 {
  font-size: 24px;
  margin-bottom: 15px;
}

.video-description p {
  font-size: 16px;
  line-height: 1.5;
}

.admin-actions .btn {
  padding: 10px 20px;
  margin-right: 10px;
  font-weight: bold;
  text-decoration: none;
  border: 2px solid #f8c471;
  color: #f8c471;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s, color 0.3s;
}

.admin-actions .btn:hover {
  background-color: #f8c471;
  color: #000;
}

@media (max-width: 600px) {
  .video-iframe {
    height: 300px;
  }

  h1,
  .video-description h1 {
    font-size: 20px;
  }

  .video-description p {
    font-size: 14px;
  }
}

/* Section pour la description sous la vidéo */
.description-section {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8); /* Fond semi-transparent */
  padding: 20px;
}

.video-excerpt {
  font-size: 18px;
  color: #f1f1f1;
}
/* Bouton "Voir plus" / "Voir moins" */

.toggle-button {
  background-color: transparent;
  border: none;
  color: #f8c471;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none; /* Retirer le soulignement */
  margin-top: 10px;
  display: inline-flex; /* Utiliser inline-flex pour permettre le centrage */
  flex-direction: column; /* Empiler les éléments verticalement */
  align-items: center;
  justify-content: center;
}

.button-content {
  display: flex;
  flex-direction: column; /* Empile les éléments verticalement */
  align-items: center;
}

.button-content.expanded {
  flex-direction: column-reverse; /* Inverse l'ordre des éléments */
}

.button-content span {
  font-size: 16px;
}

.button-content i {
  font-size: 16px;
  margin-top: 5px; /* Espacement entre le texte et l'icône */
}

.button-content.expanded i {
  margin-top: 0;
  margin-bottom: 5px;
}

.toggle-button:hover {
  color: #f8a471;
}
</style>
