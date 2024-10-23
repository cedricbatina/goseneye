<template>
  <div class="create-video-page">
    <h1>Créer une nouvelle vidéo</h1>

    <!-- Formulaire de création de vidéo -->
    <form @submit.prevent="submitForm">
      <!-- Champ Titre -->
      <div class="form-group">
        <label for="title">Titre</label>
        <input
          v-model="formData.title"
          type="text"
          id="title"
          class="form-control"
          placeholder="Entrez le titre de la vidéo"
          required
        />
      </div>

      <!-- Champ URL YouTube -->
      <div class="form-group">
        <label for="youtube_url">URL de la vidéo YouTube</label>
        <input
          v-model="formData.youtube_url"
          type="url"
          id="youtube_url"
          class="form-control"
          placeholder="Entrez l'URL YouTube"
          required
        />
      </div>

      <!-- Champ Catégorie (dropdown) -->
      <div class="form-group">
        <label for="category_id">Catégorie</label>
        <select
          v-model="formData.category_id"
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

      <!-- Champ Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          v-model="formData.description"
          id="description"
          class="form-control"
          placeholder="Entrez une description de la vidéo"
          required
        ></textarea>
      </div>

      <!-- Champ Durée de la Vidéo -->
      <div class="form-group">
        <label>Durée de la vidéo</label>
        <div class="duration-selectors">
          <select v-model="duration.hours" class="duration-input">
            <option v-for="n in 5" :key="n" :value="n - 1">
              {{ n - 1 }} heures
            </option>
          </select>
          <select v-model="duration.minutes" class="duration-input">
            <option v-for="n in 60" :key="n" :value="n - 1">
              {{ n - 1 }} minutes
            </option>
          </select>
          <select v-model="duration.seconds" class="duration-input">
            <option v-for="n in 60" :key="n" :value="n - 1">
              {{ n - 1 }} secondes
            </option>
          </select>
        </div>
      </div>

      <!-- Bouton Soumettre -->
      <button type="submit" class="btn btn-primary">Créer la vidéo</button>
    </form>

    <!-- Bouton pour revenir aux vidéos par catégorie -->
    <AdminButtons />

    <!-- Affichage des messages de succès ou d'erreur -->
    <div v-if="message" :class="['message-box', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/authStore";
import { useRouter } from "vue-router";

// Utilisation de Vue Router pour rediriger après la création de la vidéo
const router = useRouter();

const formData = ref({
  title: "",
  youtube_url: "",
  description: "",
  category_id: "",
  user_id: "", // L'utilisateur connecté
  duration: null, // Durée de la vidéo
});

const duration = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
});

// Messages de succès ou d'erreur
const message = ref("");
const messageType = ref("");

// Liste des catégories récupérées de l'API
const categories = ref([]);

// Récupérer l'utilisateur connecté depuis le store Pinia
const authStore = useAuthStore();

// Récupérer les catégories au montage du composant
onMounted(async () => {
  try {
    const res = await fetch("/api/get-categories");
    const data = await res.json();
    if (res.ok && data.categories) {
      categories.value = data.categories;
    } else {
      throw new Error(
        data.error || "Erreur lors de la récupération des catégories"
      );
    }

    // Assigner l'ID de l'utilisateur connecté à formData
    if (authStore.user) {
      formData.value.user_id = authStore.user.id;
    } else {
      throw new Error("Utilisateur non connecté.");
    }
  } catch (error) {
    message.value = error.message;
    messageType.value = "error";
  }
});

// Fonction pour soumettre le formulaire
const submitForm = async () => {
  try {
    // Ajouter la durée au formData
    formData.value.duration = `${String(duration.value.hours).padStart(
      2,
      "0"
    )}:${String(duration.value.minutes).padStart(2, "0")}:${String(
      duration.value.seconds
    ).padStart(2, "0")}`;

    console.log("Données soumises : ", formData.value);

    const res = await fetch("/api/videos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify(formData.value),
    });

    const data = await res.json();

    if (res.ok) {
      message.value = "Vidéo créée avec succès !";
      messageType.value = "success";

      // Réinitialiser le formulaire après succès
      formData.value = {
        title: "",
        youtube_url: "",
        description: "",
        category_id: "",
        duration: "", // Réinitialiser aussi la durée
        user_id: authStore.user.id,
      };

      // Redirection après la création
      setTimeout(() => {
        router.push("/admin/");
      }, 2000); // Redirection après 2 secondes
    } else {
      throw new Error(data.message || "Erreur lors de la création de la vidéo");
    }
  } catch (error) {
    message.value = error.message;
    messageType.value = "error";
  }
};
</script>

<style scoped>
.create-video-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #000;
  color: #f8c471;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: 1px solid #f8c471;
  border-radius: 8px;
  background-color: #222;
  color: #f8c471;
}

.form-control::placeholder {
  color: #aaa;
}

.duration-selectors {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.duration-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #f8c471;
  border-radius: 8px;
  background-color: #222;
  color: #f8c471;
}

.btn {
  background-color: #f8c471;
  color: #000;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  margin-top: 20px;
}

.btn:hover {
  background-color: #cda85b;
}

.video-category-button {
  margin-top: 30px;
  text-align: center;
}

.btn-secondary {
  background-color: #333;
  color: #f8c471;
  border: 1px solid #f8c471;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-secondary:hover {
  background-color: #444;
}

.message-box {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .create-video-page {
    padding: 20px;
  }

  .btn {
    width: 100%;
    margin-top: 10px;
  }

  .duration-selectors {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem;
  }

  .form-control {
    font-size: 14px;
  }

  .btn {
    font-size: 14px;
    padding: 8px 12px;
  }

  .btn-secondary {
    padding: 8px 12px;
  }
}
</style>
