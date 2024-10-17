<template>
  <div class="homepage-container">
    <!-- Paragraphe pour présenter les catégories -->
    <div class="intro-section">
      <p>
        Explorez les différentes catégories de vidéos proposées par Gosen'Eye.
        Chaque catégorie vous plonge dans un univers visuel unique, que ce soit
        pour des événements, des créations artistiques, ou des productions
        spéciales. Parcourez nos collections et trouvez les vidéos qui résonnent
        avec vos goûts.
      </p>
    </div>

    <!-- Section des vidéos par catégorie -->
    <VideoByCategory />
    <CategoryVideoButtons />
    <SearchVideoForm />
    <!-- Section pour les dernières vidéos paginées -->
    <div class="latest-videos-section">
      <div v-if="loading">Chargement des vidéos...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <!-- Utilisation du composant VideoGrid pour afficher les vidéos -->
        <h1 class="m-5">Les vidéos</h1>

        <VideoGrid :videos="paginatedVideos" />

        <!-- Composant de pagination pour naviguer entre les vidéos -->
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @updatePage="currentPage = $event"
        />
      </div>
    </div>

    <AdminButtons />
    <!-- Section de clôture -->
    <div class="closing-section">
      <p>
        Chez <strong>Gosen'Eye</strong>, chaque vidéo est une opportunité de
        raconter une histoire unique. Nous classons nos vidéos en différentes
        catégories pour vous aider à trouver ce qui vous inspire le plus. Notre
        équipe est passionnée par la capture des moments précieux et par la
        création d'œuvres visuelles qui captivent et inspirent.
      </p>
      <p>
        Nous travaillons avec les dernières technologies pour offrir des vidéos
        d'une qualité exceptionnelle, quel que soit votre projet. Nous nous
        engageons à dépasser vos attentes, en vous offrant des vidéos qui
        reflètent vos valeurs, vos événements, et vos idées.
      </p>
      <p>
        Prêt à démarrer un projet vidéo avec nous ?
        <strong>Contactez-nous dès aujourd'hui</strong> pour en savoir plus sur
        nos services et découvrir comment nous pouvons vous aider à concrétiser
        vos idées.
      </p>
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
import VideoGrid from "~/components/VideoGrid.vue";
import VideoByCategory from "~/components/VideoByCategory.vue";

// Utiliser useHead pour définir le titre et les balises meta pour la page des catégories
useHead(() => {
  const title = "Catégories de Vidéos - Gosen'Eye | Explorez nos collections";
  const description =
    "Découvrez les différentes catégories de vidéos proposées par Gosen'Eye. Que vous soyez intéressé par les mariages, les événements, ou des créations artistiques, explorez nos vidéos classées par thème.";

  return {
    title,
    meta: [
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "catégories vidéos, vidéaste, événements, créations artistiques, Gosen'Eye, production vidéo",
      },
      // Balises Open Graph pour le partage sur les réseaux sociaux
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.goseneye.com/categories" },
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

// Calculer les vidéos à afficher pour la page courante
const paginatedVideos = computed(() => {
  const start = (currentPage.value - 1) * videosPerPage;
  const end = start + videosPerPage;
  return videos.value.slice(start, end);
});

// Calculer le nombre total de pages
const totalPages = computed(() =>
  Math.ceil(videos.value.length / videosPerPage)
);

// Fonction pour récupérer les vidéos de l'API
const fetchVideos = async () => {
  try {
    const data = await $fetch("/api/get-videos");

    if (data && data.videos) {
      videos.value = data.videos;
      console.log("Vidéos récupérées : ", videos.value.length);
    } else {
      throw new Error("Aucune vidéo trouvée");
    }
  } catch (err) {
    error.value = err.message || "Erreur lors de la récupération des vidéos";
  } finally {
    loading.value = false;
  }
};

// Charger les vidéos lors de la montée du composant
onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
/* Design noir et or élégant pour la page des catégories */

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

/* Section de clôture */
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
  background-color: #f8c471;
  color: #000;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.contact-button:hover {
  background-color: #cda85b;
  color: #fff;
}
</style>
