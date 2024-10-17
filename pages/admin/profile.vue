<template>
  <div class="profile-container">
    <h1 class="profile-title">Profil de {{ user.username }}</h1>

    <div class="profile-info">
      <h2>Informations personnelles</h2>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Rôle :</strong> {{ userRole }}</p>
    </div>

    <div class="video-info">
      <h2>Statistiques de vidéos</h2>
      <p><strong>Nombre total de vidéos :</strong> {{ totalVideos }}</p>
      <p><strong>Vidéos créées récemment :</strong></p>
      <ul>
        <li v-for="video in recentVideos" :key="video.slug">
          <nuxt-link :to="`/video/${video.slug}`" class="video-link">
            {{ video.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/authStore";
import { useHead } from "#imports"; // Utilisation de useHead pour le SEO

// Appliquer le middleware à cette page
definePageMeta({
  middleware: "auth", // Utilisation du middleware "auth"
  requiresAdmin: true, // Cette page nécessite un accès administrateur
});

// Variables réactives
const authStore = useAuthStore();
const user = ref(authStore.user || {});
const userRole = ref("Utilisateur");
const totalVideos = ref(0);
const recentVideos = ref([]);

// Charger les informations de l'utilisateur et ses vidéos
onMounted(async () => {
  if (user.value.role_id === 1) {
    userRole.value = "Admin";
  }

  try {
    // Récupérer le nombre total de vidéos et les vidéos récentes de l'admin
    const res = await fetch(`/api/admin-videos?user_id=${user.value.id}`);
    const data = await res.json();

    if (res.ok && data) {
      totalVideos.value = data.totalVideos;
      recentVideos.value = data.recentVideos;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos", error);
  }
});

useHead({
  title: `Profil de ${user.value.username} - Admin`,
  meta: [
    {
      name: "description",
      content: `Page de profil de ${user.value.username}, avec les informations personnelles et les vidéos créées.`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: user.value.username,
        videoCount: totalVideos.value,
        recentVideos: recentVideos.value.map((video) => ({
          "@type": "VideoObject",
          name: video.title,
          url: `/video/${video.slug}`,
        })),
      }),
    },
  ],
});
</script>

<style scoped>
.profile-container {
  padding: 30px;
  background-color: #000;
  color: #f8c471;
  text-align: center;
}

.profile-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-info,
.video-info {
  background-color: #111;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #f8c471;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #f8c471;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

/* Style spécifique pour les liens */
.video-link {
  color: #f8c471; /* Couleur dorée pour les liens */
  text-decoration: none; /* Supprimer le soulignement par défaut */
  transition: color 0.3s ease; /* Ajouter une transition pour un effet fluide */
}

.video-link:hover {
  color: #fff; /* Le lien devient blanc au survol */
}

/* Responsive design */
@media (max-width: 768px) {
  .profile-container {
    padding: 20px;
  }
  .profile-title {
    font-size: 20px;
  }
  .profile-info,
  .video-info {
    padding: 15px;
    border-radius: 8px;
  }
}
</style>
