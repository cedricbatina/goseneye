<template>
  <div class="homepage-container">
    <div class="video-section m-5" v-if="videoSrc">
      <div class="video-wrapper">
        <iframe
          id="youtube-player"
          class="youtube-video"
          :src="videoSrc"
          frameborder="0"
          loading="lazy"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- Afficher un message si aucune vidéo n'est disponible -->
    <div v-else class="no-video">
      <p>Aucune vidéo disponible pour le moment.</p>
    </div>

    <!-- Description de la vidéo sous la vidéo -->
    <div class="description-section" v-if="video">
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

    <!-- Section des vidéos par catégorie -->
    <VideoByCategory />
    <HomeCategoryVideoButtons />
    <SearchVideoForm />
    <AdminButtons />
    <!-- Texte de clôture -->
    <div class="mt-5 p-4 description-section">
      <p class="video-excerpt">
        Chez <strong>Gosen'Eye</strong>, nous allons au-delà de la simple
        capture de vidéos : nous élaborons des récits visuels authentiques et
        captivants. Grâce à notre expertise technique et notre passion pour
        l'art visuel, chaque projet que nous entreprenons est unique et
        personnalisé. Que ce soit pour un mariage, un événement d'entreprise ou
        une production artistique, notre équipe de professionnels dévoués
        s'engage à immortaliser chaque instant avec précision et créativité.
        <br v-if="isClosingTextExpanded" />
        <span v-if="isClosingTextExpanded">
          Forts de plusieurs années d'expérience dans le domaine audiovisuel,
          nous utilisons les technologies les plus récentes pour vous offrir des
          vidéos de haute qualité, parfaitement adaptées à vos besoins et à vos
          attentes. Notre objectif est clair : créer des productions qui
          reflètent votre identité et qui laissent une empreinte mémorable.
          <br />
          Prêt à concrétiser vos idées ?
          <strong>Contactez-nous dès maintenant</strong> pour discuter de votre
          projet et planifier une rencontre. Nous sommes impatients de
          collaborer avec vous pour transformer votre vision en réalité et créer
          ensemble des souvenirs inoubliables.
        </span>
      </p>
      <button @click="toggleClosingText" class="toggle-button">
        <div
          class="button-content"
          :class="{ expanded: isClosingTextExpanded }"
        >
          <span>{{ isClosingTextExpanded ? "Voir moins" : "Voir plus" }}</span>
          <i
            :class="
              isClosingTextExpanded
                ? 'fas fa-chevron-up'
                : 'fas fa-chevron-down'
            "
          ></i>
        </div>
      </button>

      <p class="text-center">
        <nuxt-link to="/contact" class="contact-button btn btn-primary">
          Prendre rendez-vous
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useAsyncData, useHead } from "#imports"; // Importer useHead
import VideoByCategory from "~/components/VideoByCategory.vue";

// Variables pour l'état de la description
const isDescriptionExpanded = ref(false);
const isClosingTextExpanded = ref(false);

const toggleClosingText = () => {
  isClosingTextExpanded.value = !isClosingTextExpanded.value;
};

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
}

// Déclarer 'video' comme ref réactive
const video = ref(null);

// Mettre à jour 'video' lorsque 'videoData' change
watchEffect(() => {
  video.value = videoData.value?.video || null;
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

// ---- Ajout pour le SEO ----

// Utiliser useHead pour définir le titre et les balises meta
useHead(() => {
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
    },
  ];
  const title = "Accueil - Gosen'Eye | Réalisons votre vision";
  const description =
    "Réalisons votre vision en découvrant les dernières réalisations de Gosen'Eye, vidéaste professionnel spécialisé dans la capture de moments inoubliables.";

  return {
    title,
    meta: [
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "vidéaste, professionnel, vidéo, mariage, événementiel, business, Gosen'Eye, Bordeaux, art, visuel, film, Gironde",
      },
      // Balises Open Graph pour le partage sur les réseaux sociaux
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.goseneye.com/" }, // Remplacez par l'URL de votre site
      {
        property: "og:image",
        content: "https://www.goseneye.com/public/images/signature.png",
      }, // Remplacez par le chemin de votre image
      // Balises Twitter Card
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://www.goseneye.com/public/images/signature.png",
      }, // Remplacez par le chemin de votre image
    ],
  };
});
</script>


<style scoped>
/* Design noir et or avec une grille pour la vidéo principale */
.home-page {
  background-color: #000;
  color: #f8c471; /* Or */
  min-height: 100vh;
  padding-top: 20px;
}

h1 {
  color: #f8c471;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 20px;
}

/* Section pour la vidéo de mariage en plein écran */
.video-section {
  position: relative;
  width: 100%;
  height: 80vh; /* Pleine hauteur de l'écran */
  overflow: hidden; /* Masquer tout dépassement */
}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/*
.youtube-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover; 
}*/
.youtube-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 400px; /* Fixer une hauteur minimale */
  border: none;
  object-fit: cover;
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
  flex-direction: column; /* Icône en dessous du texte par défaut */
  align-items: center;
  transition: flex-direction 0.3s ease; /* Transition fluide pour le changement d'ordre */
}

.button-content.expanded {
  flex-direction: column-reverse; /* Inverse l'ordre pour mettre l'icône au-dessus du texte */
}

.button-content span {
  font-size: 16px;
}

.button-content i {
  font-size: 16px;
  margin-top: 5px;
  transition: transform 0.3s ease;
}

.toggle-button:hover {
  color: #f8a471;
}

/* Message lorsqu'aucune vidéo n'est disponible */
.no-video {
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
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

.closing-section p {
  margin-bottom: 20px;
  color: #f1f1f1; /* Texte blanc cassé pour améliorer la lisibilité */
}

.closing-section strong {
  color: #f8c471; /* Doré plus éclatant */
}

.contact-button {
  display: inline-block;
  padding: 12px 20px;
  background-color: #f8c471;
  color: #000;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  margin: 10px;
}

.contact-button:hover {
  background-color: #cda85b;
}

/* --- Media Queries for Responsiveness --- */

/* Pour les écrans de moins de 768px (tablettes et mobiles) */
@media (max-width: 768px) {
  .video-section {
    height: 60vh; /* Réduire la hauteur de la vidéo sur les petits écrans */
  }

  .youtube-video {
    height: 60vh; /* Adapter la hauteur de la vidéo */
  }

  .description-section {
    padding: 10px;
  }

  .video-excerpt {
    font-size: 16px; /* Réduire la taille du texte */
  }

  .toggle-button {
    font-size: 14px; /* Réduire la taille du bouton */
  }

  .closing-section {
    font-size: 16px;
    padding: 20px;
  }

  .contact-button {
    padding: 10px 15px;
  }
}

/* Pour les très petits écrans (moins de 480px) */
@media (max-width: 480px) {
  .video-section {
    height: 50vh; /* Réduire davantage la hauteur sur les petits écrans */
  }

  .youtube-video {
    height: 50vh;
  }

  .description-section {
    padding: 5px;
  }

  .video-excerpt {
    font-size: 14px;
  }

  .toggle-button {
    font-size: 12px;
  }

  .closing-section {
    font-size: 14px;
    padding: 10px;
  }

  .contact-button {
    padding: 8px 12px;
  }
}
</style>
