<template>
  <div class="homepage-container">
    <div class="user-profile-page">
      <h1>Bonjour de {{ user.username }}</h1>

      <RealTimeDate />

      <div class="profile-section">
        <h2>Informations personnelles</h2>
        <p><strong>Nom :</strong> {{ user.username }}</p>
        <p><strong>Email :</strong> {{ user.email }}</p>
        <p><strong>Rôle :</strong> {{ userRole }}</p>
      </div>

      <div class="profile-section">
        <h2>Paramètres du compte</h2>
        <nuxt-link to="/user/profile/edit" class="btn m-2"
          >Modifier mes informations</nuxt-link
        >
        <button class="btn m-2" @click="logout">Se déconnecter</button>
      </div>

      <div class="profile-section">
        <h2>Historique des activités</h2>
        <!-- Exemple de section pour afficher l'historique des vidéos regardées, etc. -->
        <ul v-if="user.activities && user.activities.length > 0">
          <li v-for="activity in user.activities" :key="activity.id">
            {{ activity.description }} - {{ activity.date }}
          </li>
        </ul>
        <p v-else>Aucune activité récente.</p>
      </div>
    </div>
    s
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/authStore";
import { useRouter } from "vue-router";
import { useHead } from "#imports";

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

// Fonction de déconnexion
const router = useRouter();
const logout = () => {
  authStore.logout();
  router.push("/");
};

// SEO
useHead({
  title: `Profil de ${user.value.username} | Gosen'Eye`,
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});
</script>

<style scoped>
.user-profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #000; /* Fond noir */
  color: #f8c471; /* Texte doré */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #f8c471;
}

.profile-section {
  margin-bottom: 40px;
}

h2 {
  color: #f8c471;
  margin-bottom: 20px;
}

p {
  margin: 5px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #333;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #f8c471;
}

.btn {
  background-color: #f8c471;
  color: #000;
  padding: 10px 20px;
  margin: 30px 0;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #cda85b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-profile-page {
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
