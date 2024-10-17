<template>
  <div class="edit-user">
    <h1>Modifier l'utilisateur : {{ user.username }}</h1>

    <form @submit.prevent="submitForm">
      <!-- Champ Nom -->
      <div class="form-group">
        <label for="username">Nom</label>
        <input
          v-model="formData.username"
          type="text"
          id="username"
          class="form-control"
          placeholder="Entrez le nom de l'utilisateur"
          required
        />
      </div>

      <!-- Champ Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          class="form-control"
          placeholder="Entrez l'email"
          required
        />
      </div>

      <!-- Champ Rôle -->
      <div class="form-group">
        <label for="role_id">Rôle</label>
        <select v-model="formData.role_id" id="role_id" class="form-control">
          <option value="1">Admin</option>
          <option value="2">Utilisateur</option>
        </select>
      </div>

      <!-- Bouton de soumission -->
      <div class="button-container">
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save"></i> Modifier l'utilisateur
        </button>
        <nuxt-link to="/admin/users" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Retour
        </nuxt-link>
      </div>
    </form>

    <!-- Message de succès ou d'erreur -->
    <div v-if="message" :class="['message-box', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const formData = ref({
  username: "",
  email: "",
  role_id: 2, // 1 = Admin, 2 = Utilisateur
});
const message = ref("");
const messageType = ref("");
const user = ref({}); // Stocker les informations de l'utilisateur

const router = useRouter();
const route = useRoute();
const userId = route.params.userId;

// Fonction pour récupérer les détails de l'utilisateur à modifier
const fetchUserDetails = async () => {
  try {
    const response = await fetch(`/api/get-user/${userId}`);
    const data = await response.json();
    if (response.ok) {
      user.value = data.user;
      formData.value = {
        username: data.user.username,
        email: data.user.email,
        role_id: data.user.role_id,
      };
    } else {
      throw new Error(
        data.error || "Erreur lors de la récupération de l'utilisateur"
      );
    }
  } catch (error) {
    message.value = error.message;
    messageType.value = "error";
  }
};

// Fonction pour soumettre le formulaire
const submitForm = async () => {
  try {
    const response = await fetch(`/api/update-user/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData.value),
    });

    const data = await response.json();
    if (response.ok) {
      message.value = "Utilisateur modifié avec succès !";
      messageType.value = "success";
      // Redirection après 2 secondes
      setTimeout(() => router.push("/admin/users"), 2000);
    } else {
      throw new Error(
        data.error || "Erreur lors de la modification de l'utilisateur"
      );
    }
  } catch (error) {
    message.value = error.message;
    messageType.value = "error";
  }
};

// Récupérer les détails de l'utilisateur au montage
onMounted(() => {
  fetchUserDetails();
});
</script>

<style scoped>
.edit-user {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #000;
  color: #f8c471;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
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
  padding: 10px;
  border: 1px solid #f8c471;
  border-radius: 5px;
  background-color: #333;
  color: #f8c471;
}

.form-control::placeholder {
  color: #aaa;
}

/* Button Styles */
.button-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  background-color: #f8c471;
  color: #000;
  padding: 10px 15px;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.btn-primary {
  background-color: #f8c471;
  border: none;
}

.btn-primary:hover {
  background-color: #cda85b;
}

.btn-secondary {
  background-color: #333;
  color: #f8c471;
  border: 1px solid #f8c471;
}

.btn-secondary:hover {
  background-color: #444;
}

/* Message Box Styles */
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

/* Responsive Styles */
@media (max-width: 768px) {
  .edit-user {
    padding: 15px;
  }

  .btn {
    font-size: 14px;
    padding: 8px 12px;
  }

  .button-container {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .btn {
    font-size: 12px;
    padding: 6px 10px;
  }

  .form-control {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
