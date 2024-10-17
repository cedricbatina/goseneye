<template>
  <div class="homepage-container">
    <h1 class="m-4">Modification d'une vidéo</h1>

    <!-- Boutons de navigation -->
    <div class="button-group mt-4">
      <nuxt-link to="/admin/video/manage-videos" class="btn-nav">
        <i class="fas fa-film"></i> Gérer les vidéos
      </nuxt-link>
      <nuxt-link to="/admin/users" class="btn-nav">
        <i class="fas fa-users"></i> Gérer les utilisateurs
      </nuxt-link>
      <nuxt-link to="/admin/categories" class="btn-nav">
        <i class="fas fa-film"></i> Gérer les catégories
      </nuxt-link>
      <nuxt-link to="/admin" class="btn-nav">
        <i class="fas fa-home"></i> Retour à Admin Board
      </nuxt-link>
    </div>

    <div class="edit-video-page">
      <p class="text-center text-white fw-bold">
        {{ video.id }} - {{ video.title }}
      </p>
      <form @submit.prevent="updateVideo">
        <div class="form-group">
          <label for="title">Titre</label>
          <input
            v-model="video.title"
            type="text"
            id="title"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            v-model="video.description"
            id="description"
            class="form-control"
            rows="5"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="youtube_url">URL de la vidéo YouTube</label>
          <input
            v-model="video.youtube_url"
            type="text"
            id="youtube_url"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="category_id">Catégorie</label>
          <select
            v-model="video.category_id"
            id="category_id"
            class="form-control"
            required
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Champ Durée de la Vidéo -->
        <div class="form-group">
          <label for="duration">Durée de la vidéo</label>
          <input
            v-model="video.duration"
            type="text"
            id="duration"
            class="form-control"
            placeholder="Entrez la durée (HH:MM:SS)"
            required
          />
        </div>

        <div class="admin-buttons">
          <button type="submit" class="btn-admin btn-outline">
            <i class="fas fa-save"></i> Modifier
          </button>
          <nuxt-link
            :to="`/admin/video/delete/${video.slug}`"
            class="btn-admin btn-outline btn-delete"
          >
            <i class="fas fa-trash-alt"></i> Supprimer
          </nuxt-link>
        </div>
        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const video = ref({
  title: "",
  description: "",
  youtube_url: "",
  category_id: "",
  duration: "", // Ajouter la durée dans l'objet video
});
const categories = ref([]);
const route = useRoute();
const router = useRouter();
const successMessage = ref("");
const errorMessage = ref("");

const fetchVideo = async () => {
  try {
    const slug = route.params.slug;
    console.log(`Fetching video details for slug: ${slug}`); // Log le slug pour le débogage

    const res = await fetch(`/api/get-video-by-slug/${slug}`);
    const data = await res.json();

    console.log("Données de l'API reçues :", data); // Log pour vérifier les données reçues

    if (res.ok && data.video) {
      video.value = data.video;
    } else {
      console.error("Erreur lors de la récupération de la vidéo:", data.error);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de la vidéo:", err);
  }
};

const fetchCategories = async () => {
  try {
    const res = await fetch("/api/get-categories");
    const data = await res.json();
    categories.value = data.categories;
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories:", err);
  }
};

const updateVideo = async () => {
  try {
    const slug = route.params.slug;
    console.log(`Updating video with slug: ${slug}`, video.value); // Log pour vérifier les données mises à jour

    const res = await fetch(`/api/videos/update/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video.value),
    });

    if (res.ok) {
      successMessage.value =
        "Vidéo mise à jour avec succès ! Vous serez redirigé dans 3 secondes...";
      setTimeout(() => {
        router.push(`/manage-videos`);
      }, 3000);
    } else {
      const errorData = await res.json();
      console.error("Erreur lors de la mise à jour de la vidéo:", errorData);
      errorMessage.value = "Erreur lors de la mise à jour de la vidéo.";
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour:", err);
    errorMessage.value = "Une erreur est survenue lors de la mise à jour.";
  }
};

onMounted(() => {
  fetchVideo();
  fetchCategories();
});
</script>

<style scoped>
.edit-video-page {
  background-color: #000;
  color: #f8c471;
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #f8c471;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 2px solid #f8c471;
  background-color: #333;
  color: #fff;
  border-radius: 8px;
}
.btn-nav {
  margin: 2px;
}
.admin-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

.btn-admin {
  padding: 10px 20px;
  background-color: transparent;
  color: #f8c471;
  font-weight: bold;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 2px solid #f8c471;
  transition: background-color 0.3s ease, transform 0.2s;
  font-size: 16px;
  cursor: pointer;
}

.btn-admin:hover {
  background-color: rgba(248, 196, 113, 0.1);
  transform: scale(1.05);
  border-color: #cda85b;
}

.btn-admin i {
  margin-right: 5px;
}

.btn-delete {
  border-color: #e74c3c;
  color: #e74c3c;
}

.btn-delete:hover {
  background-color: rgba(231, 76, 60, 0.1);
  border-color: #c0392b;
}

.success-message {
  color: #28a745;
  margin-top: 20px;
  text-align: center;
}

.error-message {
  color: #dc3545;
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .edit-video-page {
    padding: 20px;
    max-width: 100%;
  }

  .admin-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .btn-admin {
    width: 100%;
    text-align: center;
  }
}
</style>