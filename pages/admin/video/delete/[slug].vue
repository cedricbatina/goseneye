<template>
  <div class="homepage-container">
    <div class="homepage-container delete-video-page">
      <h1>Supprimer la vidéo</h1>
      <p>Êtes-vous sûr de vouloir supprimer la vidéo suivante ?</p>
      <div class="video-thumbnail-container">
        <img
          :src="video.thumbnail_url"
          alt="Thumbnail de la vidéo"
          class="video-thumbnail"
        />
      </div>
      <h2>{{ video.title }}</h2>
      <p>{{ video.description }}</p>
      <p>
        <strong>Catégorie :</strong>
        {{ video.category_name || "Non spécifiée" }}
      </p>
      <p>
        <strong>Date de publication :</strong>
        {{ new Date(video.published_at).toLocaleDateString("fr-FR") }}
      </p>
      <div>
        <button @click="showModal = true" class="btn btn-delete">
          Supprimer
        </button>
        <nuxt-link to="/admin/video/manage-videos" class="btn btn-cancel"
          >Annuler</nuxt-link
        >
      </div>

      <!-- Modal de confirmation -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>Confirmer la suppression</h3>
          <p>Voulez-vous vraiment supprimer cette vidéo ?</p>
          <button @click="deleteVideo" class="btn btn-confirm">
            Oui, supprimer
          </button>
          <button @click="showModal = false" class="btn btn-cancel">
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const video = ref({});
const route = useRoute();
const router = useRouter();
const showModal = ref(false);

const fetchVideo = async () => {
  try {
    const res = await fetch(`/api/get-video-by-slug/${route.params.slug}`);
    const data = await res.json();
    video.value = data.video;
  } catch (err) {
    console.error("Erreur lors de la récupération de la vidéo:", err);
  }
};

const deleteVideo = async () => {
  try {
    const res = await fetch(`/api/videos/delete/${route.params.slug}`, {
      method: "DELETE",
    });
    if (res.ok) {
      showModal.value = false;
      router.push("/admin");
    } else {
      console.error("Erreur lors de la suppression de la vidéo.");
    }
  } catch (err) {
    console.error("Erreur lors de la suppression:", err);
  }
};

onMounted(() => {
  fetchVideo();
});
</script>

<style scoped>
.delete-video-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a1a; /* Noir doux */
  color: #f8c471; /* Doré */
  text-align: center;
}

h1 {
  color: #f8c471;
}

p {
  color: #f1f1f1;
}

.video-thumbnail-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.video-thumbnail {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.btn-delete {
  background-color: #f00;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #f8c471;
  color: #000;
  padding: 10px;
  margin-left: 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #1a1a1a;
  color: #f8c471;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.btn-confirm {
  background-color: #f00;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .delete-video-page {
    padding: 10px;
  }
  .btn-delete,
  .btn-cancel {
    width: 100%;
    margin: 10px 0;
  }
}
</style>