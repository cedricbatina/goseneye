<template>
  <div class="category-videos mt-5 mb-5">
    <!-- Grid to display categories and their latest video -->
    <div v-if="categories.length > 0">
      <h1 class="text-center m-5">Catégories</h1>

      <div class="category-grid">
        <!-- Loop over categories and display the latest video -->
        <nuxt-link
          v-for="category in categories"
          :key="category.category_slug"
          :to="`/category/${category.category_slug}`"
          class="category-item"
        >
          <h3>{{ category.category_name }}</h3>
          <!-- Category Name -->

          <!-- Show the thumbnail of the latest video in the category -->
          <img
            v-if="category.thumbnail_url"
            :src="category.thumbnail_url"
            :alt="`Miniature de la dernière vidéo de ${category.category_name}`"
          />
          <p v-else>Aucune vidéo disponible</p>
          <!-- Fallback if no videos are present -->
        </nuxt-link>
      </div>
    </div>

    <!-- Message if no categories are available -->
    <div v-else>
      <p>Aucune catégorie disponible.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Define categories data to store the result
const categories = ref([]);

// Function to fetch the latest video from each category
const fetchCategoriesWithLastVideo = async () => {
  try {
    const res = await fetch("/api/get-latest-videos-per-category"); // Correct API to get the latest video from each category
    const data = await res.json();

    // Check if the data is returned and has videos
    if (res.ok && data.videos) {
      categories.value = data.videos; // Assign the fetched data to categories
    } else {
      console.error(
        "Erreur lors de la récupération des catégories :",
        data.error
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchCategoriesWithLastVideo();
});
</script>

<style scoped>
h1 {
  font-size: 24px;
  color: #f8c471;
}
/* Grid pour les vidéos paginées */
.category-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* Colonnes ajustables pour grands écrans */
  gap: 20px;
  padding: 20px;
}

.category-item {
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

.category-item img {
  width: 100%;
  height: 200px; /* Ajuster la hauteur des miniatures */
  object-fit: cover; /* Remplir les miniatures */
  border-radius: 10px;
  /* border: 2px solid #f8c471; /* Bordure dorée sur l'image */
}

.category-item h3 {
  color: #f8c471; /* Titre en doré */
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
}

/* Extrait sous le titre */
.category-item p.video-excerpt {
  color: #f1f1f1; /* Couleur blanche */
  font-size: 14px;
  margin-top: 5px; /* Ajustement d'espacement */
  margin-bottom: 10px;
}

.category-item:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* Effet d'élévation au survol */
}

/* Réactivité pour les petits écrans */
@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: 1fr; /* 1 seule colonne sur les petits écrans */
  }

  .category-item img {
    height: 150px; /* Réduire la hauteur des miniatures sur mobiles */
  }

  .category-item h3 {
    font-size: 18px; /* Réduire la taille des titres sur mobiles */
  }

  .category-item p.video-excerpt {
    font-size: 12px; /* Réduire la taille du texte sur les petits écrans */
  }
}

/* Réactivité pour les très petits écrans */
@media (max-width: 480px) {
  .category-grid {
    gap: 10px; /* Réduire l'écart entre les cartes */
    padding: 10px;
  }

  .category-item {
    padding: 10px; /* Réduire le padding sur les petits appareils */
  }

  .category-item img {
    height: 120px; /* Ajuster la hauteur de l'image */
  }

  .category-item h3 {
    font-size: 16px; /* Encore plus petit pour les très petits écrans */
  }

  .category-item p.video-excerpt {
    font-size: 11px; /* Réduire davantage la taille du texte */
  }
}
</style>
