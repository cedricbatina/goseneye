<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Logo à gauche -->
      <a class="navbar-brand" href="#">
        <Logo />
      </a>

      <!-- Bouton hamburger pour les petits écrans -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Liens de navigation -->
      <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <!-- Liens classiques -->
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/">
              <i class="fas fa-home"></i> Accueil
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/videos">
              <i class="fas fa-video stat-icon"></i> Vidéos
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/contact">
              <i class="fas fa-envelope"></i> Contact
            </nuxt-link>
          </li>

          <!-- Liens spécifiques aux utilisateurs connectés -->
          <li v-if="isLoggedIn" class="nav-item">
            <nuxt-link v-if="isAdmin" class="nav-link" to="/admin">
              <i class="fas fa-cogs"></i> Admin
            </nuxt-link>
            <nuxt-link v-else class="nav-link" to="/user/profile">
              <i class="fas fa-user"></i> Profil
            </nuxt-link>
          </li>

          <!-- Nom de l'utilisateur avec l'icône user -->
          <li v-if="isLoggedIn" class="nav-item">
            <span class="nav-link username">
              <i class="fas fa-user-circle"></i> {{ username || "Utilisateur" }}
            </span>
          </li>

          <!-- Lien de déconnexion -->
          <li v-if="isLoggedIn" class="nav-item">
            <button @click="logout" class="nav-link btn-logout">
              <i class="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/store/authStore";
import { useRouter } from "vue-router";
import { useCookie } from "#imports"; // Importation des cookies

const authStore = useAuthStore();
const router = useRouter();

const isMenuOpen = ref(false);

// Fonction pour gérer l'ouverture et la fermeture du menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Vérifier si l'utilisateur est connecté
const isLoggedIn = computed(() => !!authStore.user);

// Récupérer le rôle et le nom de l'utilisateur de manière sécurisée
const isAdmin = computed(() => authStore.user && authStore.user.role_id === 1);
const username = computed(() => authStore.user?.username || "Utilisateur");

// Fonction de déconnexion
const logout = () => {
  authStore.logout();
  router.push("/");
};

// Utiliser les cookies pour hydrater l'utilisateur lors du montage du composant
onMounted(() => {
  const tokenCookie = useCookie("auth_token");
  const userCookie = useCookie("auth_user");

  if (tokenCookie.value && userCookie.value) {
    authStore.token = tokenCookie.value;
    authStore.user = JSON.parse(userCookie.value);
  }
});
</script>


<style scoped>
/* Ajustements Flexbox pour équilibrer la navigation */
.navbar {
  background-color: #000 !important; /* Fond noir */
  color: #f8c471; /* Texte doré */
  display: flex;
  justify-content: space-between; /* Aligner logo à gauche et liens à droite */
  align-items: center;
  padding: 0 20px;
}

.navbar-brand {
  color: #f8c471 !important;
  font-family: "Montserrat", sans-serif;
}

.navbar-toggler {
  border: none;
  color: #f8c471;
}

.navbar-toggler-icon {
  background-color: #000;
  border-radius: 4px;
  padding: 5px;
}

/* Cacher les liens par défaut sur les petits écrans et afficher avec flex sur les grands écrans */
.navbar-collapse {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

/* Alignement des éléments de la navbar */
.navbar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item {
  margin-left: 20px; /* Espacement entre les éléments */
}

.nav-link {
  color: #f8c471 !important;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.nav-link i {
  margin-right: 8px;
}

.nav-link:hover {
  color: #cda85b !important;
}

/* Nom de l'utilisateur */
.username {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #f8c471;
}

.username i {
  margin-right: 8px; /* Petit espace entre l'icône et le nom */
}

.username:hover {
  color: #cda85b !important; /* Effet hover pour améliorer l'UX */
}

/* Déconnexion */
.btn-logout {
  background: none;
  border: none;
  color: #f8c471;
  cursor: pointer;
}

.btn-logout:hover {
  color: #cda85b;
}

/* Responsive Design */

/* Pour les écrans de moins de 992px (tablettes et mobiles) */
@media (max-width: 992px) {
  .navbar-collapse {
    display: none; /* Cacher le menu par défaut */
    position: absolute;
    top: 100%; /* Affichage du menu sous le header */
    right: 0; /* Le menu est aligné à droite */
    width: auto;
    background-color: #000; /* Assurer un fond noir */
    padding: 10px; /* Ajout d'espace autour du menu */
  }

  .navbar-collapse.show {
    display: block; /* Afficher le menu quand isMenuOpen est actif */
    position: relative;
    padding-bottom: 200px; /* Ajuster cette valeur selon la taille du menu pour éviter le chevauchement */
  }

  .navbar-nav {
    display: flex;
    flex-direction: column; /* Les liens en colonne */
    align-items: flex-start; /* Aligner les liens à gauche */
  }

  .nav-item {
    margin-left: 0; /* Supprimer l'espacement horizontal entre les éléments */
    padding: 10px 0; /* Ajouter un espacement vertical */
    width: 100%; /* Prendre toute la largeur */
  }

  .nav-link {
    width: 100%; /* Rendre les liens cliquables sur toute la largeur */
    padding: 10px;
    text-align: left; /* Aligner le texte à gauche */
  }

  /* Centrer le bouton hamburger */
  .navbar-toggler {
    margin-left: auto;
    margin-right: 0;
  }
}

/* Pour les très petits écrans (moins de 576px) */
@media (max-width: 576px) {
  .navbar-brand {
    font-size: 75px; /* Réduire la taille du logo sur les petits écrans */
  }

  .navbar-nav {
    padding: 10px 0;
  }

  .nav-link {
    font-size: 16px; /* Réduire la taille des liens sur les petits écrans */
  }

  .btn-logout {
    font-size: 16px; /* Réduire la taille du bouton Déconnexion */
  }
}
</style>