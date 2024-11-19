<template>
  <div class="manage-videos">
    <!-- Boutons de navigation -->
    <AdminButtons />

    <h3 class="mb-3">Gestion des Vidéos</h3>

    <!-- Tableau des vidéos -->
    <div v-if="videos.length > 0" class="video-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="video in videos" :key="video.id">
            <td>{{ video.id }}</td>
            <td>{{ video.title }}</td>
            <td>{{ video.category_name || "N/A" }}</td>
            <td>{{ formatDate(video.created_at) }}</td>
            <td>
              <!-- Bouton Modifier -->
              <nuxt-link :to="`/admin/video/edit/${video.id}`" class="btn-edit">
                Modifier
              </nuxt-link>
              <!-- Bouton Supprimer -->
              <button @click="confirmDelete(video.id)" class="btn-delete">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Aucune vidéo trouvée.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const videos = ref([]);

// Fonction pour récupérer la liste des vidéos
const fetchVideos = async () => {
  try {
    const response = await fetch("/api/get-videos");
    const data = await response.json();
    console.log("Données reçues :", data.videos); // Vérifier les données reçues
    videos.value = data.videos;
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos", error);
  }
};

// Fonction pour formater la date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

// Fonction pour confirmer la suppression d'une vidéo
const confirmDelete = async (videoId) => {
  const isConfirmed = confirm(
    "Êtes-vous sûr de vouloir supprimer cette vidéo ?"
  );

  if (isConfirmed) {
    // Si confirmé, appel de la fonction deleteVideo
    deleteVideo(videoId);
  }
};

// Fonction pour supprimer une vidéo
const deleteVideo = async (videoId) => {
  try {
    await fetch(`/api/delete-video/${videoId}`, {
      method: "DELETE",
    });
    // Mettre à jour la liste après suppression
    fetchVideos();
  } catch (error) {
    console.error("Erreur lors de la suppression de la vidéo", error);
  }
};

onMounted(() => {
  fetchVideos();
});
</script>


<style scoped>
.manage-videos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  min-height: 100vh; /* S'assurer que la page prend toute la hauteur */
  background-color: #000;
  color: #f8c471;
  text-align: center;
}
/* Centrer le tableau et limiter sa largeur */
.video-list {
  width: 100%;
  display: flex;
  justify-content: center;
}
/* Style pour rendre la table responsive */
.table-responsive-custom {
  width: 100%;
  overflow-x: auto; /* Ajoute un défilement horizontal si nécessaire */
  -webkit-overflow-scrolling: touch; /* Défilement fluide sur mobile */
  margin-top: 20px;
}

table {
  width: 90%; /* Ajuster la largeur du tableau pour lui donner de l'espace */
  max-width: 1200px; /* Optionnel : Limiter la largeur maximale */
  border-collapse: collapse;
  margin: 0 auto; /* Centrer le tableau */
}

th,
td {
  padding: 15px;
  border: 1px solid #f8c471;
  white-space: nowrap; /* Empêche le texte de revenir à la ligne */
}

th {
  background-color: #000;
  color: #f8c471;
}

td {
  background-color: #333;
  color: #f8c471;
}

/* Effet de survol pour les lignes du tableau */
tbody tr:hover {
  background-color: #444;
}

/* Styles pour les boutons Modifier et Supprimer dans les tableaux */
.btn-edit,
.btn-delete {
  padding: 8px 12px;
  border-radius: 5px; /* Bordure arrondie pour tous */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #f8c471; /* Fond doré */
  color: #000; /* Texte noir */
  margin-right: 10px;
}

.btn-delete {
  background-color: #f00; /* Fond rouge */
  color: #fff; /* Texte blanc */
}

.btn-edit:hover {
  background-color: #cda85b; /* Fond doré plus foncé */
}

.btn-delete:hover {
  background-color: #d00; /* Fond rouge plus foncé */
}

/* Icônes pour petits écrans */
.btn-edit-icon,
.btn-delete-icon {
  display: none;
  background-color: #f8c471; /* Fond doré pour Modifier */
  color: #000; /* Texte noir */
  padding: 8px; /* Taille égale pour les icônes */
  border-radius: 10px; /* Forme arrondie pour les icônes */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-delete-icon {
  background-color: #f00; /* Fond rouge pour Supprimer */
  color: #fff;
}

.btn-edit-icon:hover,
.btn-delete-icon:hover {
  background-color: #cda85b; /* Changement de couleur au survol pour Modifier */
}

.btn-delete-icon:hover {
  background-color: #d00; /* Changement de couleur au survol pour Supprimer */
}

/* ---- Media Queries ---- */
/* ---- CSS pour les boutons avec icônes ---- */

/* Styles pour les icônes (par défaut masqués) */
.btn-edit-icon,
.btn-delete-icon {
  display: none; /* Icônes cachées sur grands écrans */
  font-size: 16px;
}

/* Styles pour les textes "Modifier" et "Supprimer" */
.action-text {
  display: inline; /* Texte visible par défaut sur grands écrans */
}

/* ---- Media Queries pour les petits écrans (inférieur à 768px) ---- */
@media (max-width: 768px) {
  /* Masquer les colonnes Catégorie et Date sur petits écrans */
  .category-column,
  .date-column {
    display: none;
  }
  .btn {
    font-size: 14px;
    padding: 10px 15px;
  }
  /* Afficher les icônes et masquer le texte sur petits écrans */
  .btn-edit-icon,
  .btn-delete-icon {
    display: inline-block; /* Afficher les icônes */
  }

  .action-text {
    display: none; /* Masquer le texte sur petits écrans */
  }
}

/* Pour les très petits écrans (moins de 480px) */
@media (max-width: 480px) {
  .btn-edit-icon,
  .btn-delete-icon {
    font-size: 14px; /* Ajuster la taille des icônes */
  }

  .btn {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>