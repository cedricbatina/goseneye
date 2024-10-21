<template>
  <div class="homepage-container">
    <!-- Paragraphe pour présenter les vidéos postées -->
    <div class="intro-section">
      <p>
        Découvrez les dernières vidéos postées par Gosen'Eye. Nous capturons
        chaque moment avec passion et expertise pour vous offrir une expérience
        visuelle unique. Explorez nos dernières productions et plongez-vous dans
        l'univers de la vidéo créative.
      </p>
    </div>

    <!-- Section pour les dernières vidéos paginées -->
    <div class="latest-videos-section">
      <h1 class="m-5">Les vidéos</h1>
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

    <!--Section Recherche de vidéos-->
    <SearchVideoForm />
    <CategoryVideoButtons />
    <!--Section Vidéos par catégoreis-->
    <VideoByCategory />
    <AdminButtons />

    <!-- Texte de clôture -->
    <div class="mt-5 p-4 description-section">
      <p class="video-excerpt">
        Chez <strong>Gosen'Eye</strong>, nous faisons plus que capturer des
        vidéos : nous racontons des histoires. Grâce à notre savoir-faire
        technique et notre passion pour l’art visuel, chaque projet que nous
        réalisons est unique et personnalisé. Que ce soit pour un mariage, un
        événement d’entreprise, ou une production artistique, notre équipe de
        professionnels dévoués travaille avec soin pour immortaliser chaque
        instant dans des images saisissantes, remplies d’émotion et de
        créativité.
        <br v-if="isClosingTextExpanded" />
        <span v-if="isClosingTextExpanded">
          Avec des années d'expérience dans la réalisation audiovisuelle, nous
          maîtrisons les dernières technologies pour vous offrir des vidéos de
          qualité supérieure, adaptées à vos besoins et à vos attentes. Notre
          engagement est simple : créer des productions qui vous ressemblent, et
          qui feront la différence.
          <br />
          Vous êtes prêt à collaborer avec nous pour transformer vos idées en
          réalité ? <strong>Contactez-nous dès aujourd'hui</strong> pour
          discuter de vos projets et planifier une rencontre. Nous serons ravis
          de vous accompagner et de faire de votre vision un souvenir
          inoubliable.
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
      <p class="cta">
        <nuxt-link to="/contact" class="contact-button"
          >Prendre rendez-vous</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useHead } from "#imports";
import Pagination from "~/components/Pagination.vue";
import VideoGrid from "~/components/VideoGrid.vue"; // Import du composant VideoGrid
import VideoByCategory from "~/components/VideoByCategory.vue";
import SearchVideoForm from "~/components/SearchVideoForm.vue";

// Variables pour l'état de la description
const isDescriptionExpanded = ref(false);
const isClosingTextExpanded = ref(false);

const toggleClosingText = () => {
  isClosingTextExpanded.value = !isClosingTextExpanded.value;
};

// Utiliser useHead pour définir le titre et les balises meta
useHead(() => {
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
    },
  ];
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

  font-size: 24px;
}
h4 {
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

.contact-button:hover {
  background-color: #cda85b;
}

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
