<template>
  <div class="admin-dashboard">
    <h1 class="m-5">Tableau de Bord - Admin</h1>

    <!-- Première section : Infos administratives -->
    <div class="info-section">
      <!-- Section pour l'affichage de l'heure actuelle -->
      <div class="card">
        <h4 class="mb-3"><i class="fas fa-clock"></i> Heure actuelle</h4>
        <p><RealTimeDate /></p>
      </div>

      <!-- Section pour les informations personnelles -->
      <nuxt-link to="/admin/profile" class="card-link no-underline">
        <div class="card">
          <h1>Bonjour</h1>
          <h4><i class="fas fa-user"></i> {{ user.username }}</h4>
          <p>
            <strong>Votre Email est </strong>
            <span class="user-info">{{ user.email }}</span>
          </p>
          <p>
            <strong>Vous avez le rôle </strong>
            <span class="user-info">{{ userRole }}</span>
          </p>
          <p></p>
          <p>
            <strong>Votre compte a été créé le </strong>
            <span class="user-infos">{{ formatDate(user.created_at) }}</span>
          </p>
        </div>
      </nuxt-link>
    </div>
    <AdminButtons />

    <!-- Deuxième section : Gestion -->
    <div class="grid-container">
      <!-- Gérer les vidéos -->
      <nuxt-link to="/admin/video/manage-videos" class="card-link">
        <div class="card">
          <h4 class="mb-3">
            <i class="fas fa-video stat-icon"></i> Les vidéos
          </h4>
          <p>Ajouter, modifier ou supprimer des vidéos.</p>
        </div>
      </nuxt-link>

      <!-- Gérer les utilisateurs -->
      <nuxt-link to="/admin/users" class="card-link">
        <div class="card">
          <h4 class="mb-3"><i class="fas fa-users"></i> Les utilisateurs</h4>
          <p>Voir et gérer les utilisateurs inscrits.</p>
        </div>
      </nuxt-link>

      <!-- Gérer les catégories -->
      <nuxt-link to="/admin/categories" class="card-link">
        <div class="card">
          <h4 class="mb3"><i class="fas fa-list"></i> Les catégories</h4>
          <p>Créer, modifier ou supprimer des catégories.</p>
        </div>
      </nuxt-link>

      <!-- Voir les statistiques -->
      <nuxt-link to="/admin/stats" class="card-link">
        <div class="card">
          <h4 class="mb-3"><i class="fas fa-chart-bar"></i> Statistiques</h4>
          <p>Voir les statistiques d'utilisation du site.</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/authStore"; // Utiliser le store d'authentification

// Utiliser les informations de l'utilisateur connecté
const authStore = useAuthStore();
const user = ref(authStore.user || {});
const userRole = ref("Utilisateur");
const formatDate = (dateString) => {
  if (!dateString) return ""; // Gérer les cas où la date est absente
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Définir le rôle de l'utilisateur
onMounted(() => {
  if (user.value.role_id === 1) {
    userRole.value = "Admin";
  }
});
</script>

<style scoped>
.admin-dashboard {
  padding: 30px;
  text-align: center;
  background-color: #000;
  color: #f8c471;
}

/* Boutons de navigation */
.admin-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

/* Première section : Infos administratives */
.info-section {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

/* Grille pour la gestion */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card-link {
  text-decoration: none;
}

.card {
  background-color: #111;
  border: 2px solid #f8c471;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, background-color 0.3s;
  color: #f1f1f1;
}

.card:hover {
  transform: scale(1.05);
  background-color: #1a1a1a;
}

/* Typographie */
h1,
h4 {
  font-size: 22px;
  color: #f8c471;
}

p {
  color: #f1f1f1;
  margin-bottom: 20px;
}
/* Suppression du surlignement */
.no-underline {
  text-decoration: none;
}

/* Design des cartes et hover */
.card-link .card:hover {
  transform: scale(1.05);
  background-color: #1a1a1a;
}
/* Bouton de navigation */
.btn-nav {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f8c471;
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-nav:hover {
  background-color: #cda85b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .info-section {
    flex-direction: column;
  }

  .grid-container {
    grid-template-columns: 1fr;
  }

  .btn-nav {
    padding: 10px;
    font-size: 16px;
  }
}
</style>
