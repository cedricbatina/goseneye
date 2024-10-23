<template>
  <div class="homepage-container">
    <!-- Composant LatestVideo -->
    <section class="video-container">
      <LatestVideo />
    </section>

    <!-- Section des vidéos par catégorie -->
    <section class="category-container">
      <VideoByCategory />
      <HomeCategoryVideoButtons />
    </section>

    <!-- Formulaire de recherche vidéo -->
    <section class="search-container">
      <SearchVideoForm />
    </section>

    <!-- Section des boutons administratifs -->
    <section class="admin-container">
      <AdminButtons />
    </section>

    <!-- Texte de clôture -->
    <section class="closing-text-container mt-5 p-4">
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
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "#imports"; // Importation de useHead pour le SEO
import LatestVideo from "~/components/LatestVideo.vue";
import VideoByCategory from "~/components/VideoByCategory.vue";
import HomeCategoryVideoButtons from "~/components/HomeCategoryVideoButtons.vue";
import SearchVideoForm from "~/components/SearchVideoForm.vue";
import AdminButtons from "~/components/AdminButtons.vue";

// Variables pour l'état de la description de clôture
const isClosingTextExpanded = ref(false);

const toggleClosingText = () => {
  isClosingTextExpanded.value = !isClosingTextExpanded.value;
};

// ---- Ajout pour le SEO avec useHead ----
useHead(() => {
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
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
      },
    ],
  };
});
</script>

<style scoped>
/* Style global */
.homepage-container {
  max-width: 1200px;
  width: 100%; /* S'assure que le conteneur s'adapte à la largeur de l'écran */
  margin: 0 auto;
  padding: 20px;
  background-color: #000;
  color: #f8c471;
  overflow: hidden; /* Empêche le débordement de son contenu */
}

/* Vidéo */
.video-container {
  display: flex;
  justify-content: center; /* Centre la vidéo horizontalement */
  align-items: center; /* Centre la vidéo verticalement */
  width: 100%; /* S'assure que le conteneur prend toute la largeur disponible */
  max-width: 1200px; /* Limite la largeur pour éviter les débordements */
  margin: 0 auto 40px auto; /* Centre horizontalement le conteneur et ajoute un espace en bas */
  overflow: hidden; /* Empêche tout débordement de la vidéo */
}

/* Réduit les marges et paddings dans les sections pour éviter les débordements */
.category-container,
.search-container,
.admin-container,
.closing-text-container {
  margin: 20px 0;
  padding: 20px;
  max-width: 100%; /* Assure que les sections ne dépassent pas la largeur du parent */
  box-sizing: border-box; /* S'assure que les paddings n'augmentent pas la largeur des éléments */
}

/* Description */
.description-section {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
}

.video-excerpt {
  font-size: 18px;
  color: #f1f1f1;
}

/* Boutons */
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

  text-align: center; /* Assure que le texte du bouton est centré */
  width: 100%; /* Prend la largeur du parent pour faciliter le centrage */
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
@media (max-width: 768px) {
  .homepage-container,
  .video-container,
  .category-container,
  .search-container,
  .admin-container,
  .closing-text-container {
    padding: 10px;
    width: 100%;
  }
  .toggle-button {
    font-size: 14px;
  }

  .video-excerpt {
    font-size: 16px;
  }

  .contact-button {
    padding: 10px 15px;
  }
}

@media (max-width: 480px) {
  .video-container,
  .category-container,
  .search-container,
  .admin-container,
  .closing-text-container {
    padding: 5px;
  }

  .toggle-button {
    font-size: 12px;
  }

  .video-excerpt {
    font-size: 14px;
  }

  .contact-button {
    padding: 8px 12px;
  }
}
</style>
