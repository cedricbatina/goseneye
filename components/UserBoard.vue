<template>
  <div class="user-board" aria-label="Tableau de bord de l'utilisateur">
    <h1>
      Bonjour, <span class="text-white">{{ user.username }}</span> !
    </h1>
    <div>
      <p>
        <RealTimeDate />
      </p>
    </div>

    <section class="user-info">
      <h2>Informations personnelles</h2>
      <p><strong>Nom :</strong> {{ user.username }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Rôle :</strong> {{ userRole }}</p>
    </section>

    <section class="user-actions">
      <h2>Actions</h2>
      <button class="btn" @click="editProfile">Modifier mon profil</button>
      <nuxt-link to="/posts" class="btn">Les vidéos</nuxt-link>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/authStore";
import { useRouter } from "vue-router";

// Utiliser les informations de l'utilisateur connecté
const authStore = useAuthStore();
const user = ref(authStore.user || {});
const userRole = ref("Utilisateur");

// Définir le rôle de l'utilisateur
onMounted(() => {
  if (user.value.role_id === 1) {
    userRole.value = "Admin";
  }
});

// Ajouter des fonctions pour les actions
const router = useRouter();
const editProfile = () => {
  router.push("/user/profile");
};
</script>

<style scoped>
.user-board {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #000; /* Fond noir */
  color: #f8c471; /* Texte doré */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

/* Structure des titres */
h1 {
  text-align: center;
  color: #f8c471;
  margin-bottom: 30px;
}

h2 {
  color: #f8c471;
  margin-bottom: 20px;
}

/* Section des informations personnelles */
.user-info {
  margin-bottom: 30px;
}

p {
  margin: 5px 0;
}

/* Actions utilisateur */
.user-actions {
  text-align: center;
}

/* Boutons */
.btn {
  background-color: #f8c471;
  color: #000;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #cda85b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-board {
    padding: 15px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  .btn {
    padding: 8px 16px;
  }
}
</style>
