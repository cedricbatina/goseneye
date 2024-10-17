<template>
  <div class="homepage-container">
    <div class="video-grid">
      <nuxt-link
        v-for="video in props.videos"
        :key="video.id"
        :to="`/video/${video.slug}`"
        class="video-item"
      >
        <img
          :src="video.thumbnail_url"
          :alt="`Miniature de la vidéo ${video.title}`"
          class="video-thumbnail"
        />
        <h3>{{ video.title }}</h3>
        <p class="video-excerpt">
          {{ truncateDescription(video.description) }}
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

// Fonction pour tronquer la description à 100 caractères
const truncateDescription = (description) => {
  return description.length > 100
    ? description.substring(0, 100) + "..."
    : description;
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
}

/* Grid pour les vidéos paginées */
.video-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* Colonnes ajustables */
  gap: 20px;
  padding: 20px;
}

.video-item {
  background-color: #000; /* Noir profond */
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #f8c471; /* Bordure dorée */
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer; /* Ajouter un curseur de clic */
  display: block; /* Transformer la carte en lien cliquable */
  color: #f1f1f1; /* Couleur du texte par défaut */
  text-decoration: none; /* Supprimer la décoration des liens */
}

.video-item img {
  width: 100%;
  height: 200px; /* Ajuster la hauteur des miniatures */
  object-fit: cover; /* Remplir les miniatures */
  border-radius: 10px;
}

.video-item h3 {
  color: #f8c471; /* Titre en doré */
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
}

/* Extrait sous le titre */
.video-item p.video-excerpt {
  color: #f1f1f1; /* Couleur blanche */
  font-size: 14px;
  margin-top: 5px; /* Ajustement d'espacement */
  margin-bottom: 10px;
}

.video-duration {
  color: #f8c471;
  font-weight: bold;
  margin-top: 5px;
}

.video-item:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* Effet d'élévation au survol */
}

/* Réactivité pour les petits écrans */
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr; /* 1 seule colonne sur les petits écrans */
  }

  .video-item img {
    height: 150px; /* Réduire la hauteur des miniatures sur mobiles */
  }

  .video-item h3 {
    font-size: 18px; /* Réduire la taille des titres sur mobiles */
  }

  .video-item p.video-excerpt {
    font-size: 12px; /* Réduire la taille du texte sur les petits écrans */
  }
}

/* Réactivité pour les très petits écrans */
@media (max-width: 480px) {
  .video-grid {
    gap: 10px; /* Réduire l'écart entre les cartes */
    padding: 10px;
  }

  .video-item {
    padding: 10px; /* Réduire le padding sur les petits appareils */
  }

  .video-item img {
    height: 120px; /* Ajuster la hauteur de l'image */
  }

  .video-item h3 {
    font-size: 16px; /* Encore plus petit pour les très petits écrans */
  }

  .video-item p.video-excerpt {
    font-size: 11px; /* Réduire davantage la taille du texte */
  }
}
</style>
