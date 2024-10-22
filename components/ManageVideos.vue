<template>
  <div class="homepage-container">
    <!-- Composant LatestVideo -->
    <LatestVideo />

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
.manage-videos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  min-height: 100vh; /* S'assurer que la page prend toute la hauteur */
  background-color: #000;
  color: #f8c471;
  text-align: center;
}
/* Centrer le tableau et limiter sa largeur */
.video-list {
  width: 100%;
  display: flex;
  justify-content: center;
}
/* Style pour rendre la table responsive */
.table-responsive-custom {
  width: 100%;
  overflow-x: auto; /* Ajoute un défilement horizontal si nécessaire */
  -webkit-overflow-scrolling: touch; /* Défilement fluide sur mobile */
  margin-top: 20px;
}

table {
  width: 90%; /* Ajuster la largeur du tableau pour lui donner de l'espace */
  max-width: 1200px; /* Optionnel : Limiter la largeur maximale */
  border-collapse: collapse;
  margin: 0 auto; /* Centrer le tableau */
}

th,
td {
  padding: 15px;
  border: 1px solid #f8c471;
  white-space: nowrap; /* Empêche le texte de revenir à la ligne */
}

th {
  background-color: #000;
  color: #f8c471;
}

td {
  background-color: #333;
  color: #f8c471;
}

/* Effet de survol pour les lignes du tableau */
tbody tr:hover {
  background-color: #444;
}

/* Styles pour les boutons Modifier et Supprimer dans les tableaux */
.btn-edit,
.btn-delete {
  padding: 8px 12px;
  border-radius: 5px; /* Bordure arrondie pour tous */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #f8c471; /* Fond doré */
  color: #000; /* Texte noir */
  margin-right: 10px;
}

.btn-delete {
  background-color: #f00; /* Fond rouge */
  color: #fff; /* Texte blanc */
}

.btn-edit:hover {
  background-color: #cda85b; /* Fond doré plus foncé */
}

.btn-delete:hover {
  background-color: #d00; /* Fond rouge plus foncé */
}

/* Icônes pour petits écrans */
.btn-edit-icon,
.btn-delete-icon {
  display: none;
  background-color: #f8c471; /* Fond doré pour Modifier */
  color: #000; /* Texte noir */
  padding: 8px; /* Taille égale pour les icônes */
  border-radius: 10px; /* Forme arrondie pour les icônes */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-delete-icon {
  background-color: #f00; /* Fond rouge pour Supprimer */
  color: #fff;
}

.btn-edit-icon:hover,
.btn-delete-icon:hover {
  background-color: #cda85b; /* Changement de couleur au survol pour Modifier */
}

.btn-delete-icon:hover {
  background-color: #d00; /* Changement de couleur au survol pour Supprimer */
}

/* ---- Media Queries ---- */
/* ---- CSS pour les boutons avec icônes ---- */

/* Styles pour les icônes (par défaut masqués) */
.btn-edit-icon,
.btn-delete-icon {
  display: none; /* Icônes cachées sur grands écrans */
  font-size: 16px;
}

/* Styles pour les textes "Modifier" et "Supprimer" */
.action-text {
  display: inline; /* Texte visible par défaut sur grands écrans */
}

/* ---- Media Queries pour les petits écrans (inférieur à 768px) ---- */
@media (max-width: 768px) {
  /* Masquer les colonnes Catégorie et Date sur petits écrans */
  .category-column,
  .date-column {
    display: none;
  }
  .btn {
    font-size: 14px;
    padding: 10px 15px;
  }
  /* Afficher les icônes et masquer le texte sur petits écrans */
  .btn-edit-icon,
  .btn-delete-icon {
    display: inline-block; /* Afficher les icônes */
  }

  .action-text {
    display: none; /* Masquer le texte sur petits écrans */
  }
}

/* Pour les très petits écrans (moins de 480px) */
@media (max-width: 480px) {
  .btn-edit-icon,
  .btn-delete-icon {
    font-size: 14px; /* Ajuster la taille des icônes */
  }

  .btn {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>