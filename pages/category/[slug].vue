<template>
  <div class="homepage-container">
    <h1 class="m-5">{{ categoryName }}</h1>
    <p class="category-description">
      Explorez notre collection de vidéos de la catégorie "{{ categoryName }}".
      Découvrez des contenus enrichissants, captivants, et conçus pour vous
      inspirer.
    </p>
    <div class="video-grid">
      <nuxt-link
        v-for="video in videos"
        :key="video.id"
        :to="`/video/${video.slug}`"
        class="video-item"
        :aria-label="`Voir la vidéo : ${video.title}`"
      >
        <img
          :src="video.thumbnail_url"
          :alt="`Miniature de la vidéo ${video.title}`"
          class="video-thumbnail"
        />
        <h3 class="m-2">{{ video.title }}</h3>
        <p class="video-excerpt">
          {{ truncateDescription(video.description) }}
        </p>
      </nuxt-link>
    </div>

    <VideoByCategory />
    <CategoryVideoButtons />
    <AdminButtons />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "#imports";

// Récupérer le paramètre slug de la route
const route = useRoute();
const videos = ref([]);
const categoryName = ref("");

// Fonction pour récupérer les vidéos par catégorie
const fetchCategoryVideos = async (slug) => {
  try {
    const res = await fetch(`/api/get-videos-by-category/${slug}`);
    const data = await res.json();

    if (res.ok && data) {
      videos.value = data.videos || [];
      categoryName.value = data.categoryName || "Catégorie non spécifiée";
    } else {
      console.error("Erreur lors de la récupération des vidéos :", data);
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};

// Fonction pour tronquer la description à 100 caractères
const truncateDescription = (description) => {
  return description && description.length > 100
    ? description.substring(0, 100) + "..."
    : description;
};

// Charger les données à la montée du composant
onMounted(() => {
  fetchCategoryVideos(route.params.slug);
});

// Ajouter le schema ItemList pour SEO
useHead({
  title: `${categoryName.value} - Liste des vidéos`,
  meta: [
    {
      name: "description",
      content: `Explorez les vidéos de la catégorie ${categoryName.value}`,
    },
    {
      property: "og:title",
      content: `${categoryName.value} - Liste des vidéos`,
    },
    {
      property: "og:description",
      content: `Explorez les vidéos de la catégorie ${categoryName.value}`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: categoryName.value,
        itemListElement: videos.value.map((video, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${window.location.origin}/video/${video.slug}`,
        })),
      }),
    },
  ],
});
</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.video-item {
  background-color: #000;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #f8c471;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: block;
  color: #f1f1f1;
  text-decoration: none;
}

.video-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.video-item h3 {
  color: #f8c471;
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
}

.video-item p.video-excerpt {
  color: #f1f1f1;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.video-item:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

h1 {
  color: #f8c471;
  text-align: center;
  font-size: 24px;
}

.category-description {
  text-align: center;
  color: #f1f1f1;
  margin-bottom: 20px;
  font-size: 1.2em;
}

/* Réactivité pour les petits écrans */
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }

  .video-item img {
    height: 150px;
  }

  .video-item h3 {
    font-size: 18px;
  }

  .video-item p.video-excerpt {
    font-size: 12px;
  }
}

/* Réactivité pour les très petits écrans */
@media (max-width: 480px) {
  .video-grid {
    gap: 10px;
    padding: 10px;
  }

  .video-item {
    padding: 10px;
  }

  .video-item img {
    height: 120px;
  }

  .video-item h3 {
    font-size: 16px;
  }

  .video-item p.video-excerpt {
    font-size: 11px;
  }
}
</style>




